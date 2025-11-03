import { Client, Tax, TaxCalculation } from '@/types/tax';

export function calculateTaxes(client: Client): TaxCalculation {
  const taxes: Tax[] = [];
  const { companyType, annualRevenue, state, sector } = client;

  // IRPJ - Imposto de Renda Pessoa Jurídica
  if (companyType !== 'PF') {
    let irpjRate = 0;
    let irpjValue = 0;

    switch (companyType) {
      case 'PJ_SIMPLES':
        // Simples Nacional - alíquota varia conforme faturamento
        if (annualRevenue <= 180000) {
          irpjRate = 4.0;
        } else if (annualRevenue <= 360000) {
          irpjRate = 5.47;
        } else {
          irpjRate = 6.84;
        }
        irpjValue = (annualRevenue * irpjRate) / 100;
        break;
      case 'PJ_PRESUMIDO':
        irpjRate = 15;
        irpjValue = (annualRevenue * 0.32 * irpjRate) / 100; // Base de cálculo presumida
        break;
      case 'PJ_REAL':
        irpjRate = 15;
        irpjValue = (annualRevenue * 0.12 * irpjRate) / 100; // Estimativa baseada na margem
        break;
    }

    taxes.push({
      name: 'IRPJ',
      rate: irpjRate,
      estimatedValue: irpjValue,
      dueDate: '31/12/2024',
      observations: companyType === 'PJ_SIMPLES' ? 'Incluído no DAS' : 'Trimestral ou anual',
      type: 'FEDERAL'
    });
  }

  // CSLL - Contribuição Social sobre o Lucro Líquido
  if (companyType !== 'PF' && companyType !== 'PJ_SIMPLES') {
    const csllRate = 9;
    const csllValue = companyType === 'PJ_PRESUMIDO' 
      ? (annualRevenue * 0.32 * csllRate) / 100
      : (annualRevenue * 0.12 * csllRate) / 100;

    taxes.push({
      name: 'CSLL',
      rate: csllRate,
      estimatedValue: csllValue,
      dueDate: '31/12/2024',
      observations: 'Contribuição Social sobre Lucro Líquido',
      type: 'FEDERAL'
    });
  }

  // PIS/COFINS
  if (companyType !== 'PJ_SIMPLES') {
    const pisRate = companyType === 'PJ_PRESUMIDO' ? 0.65 : 1.65;
    const cofinsRate = companyType === 'PJ_PRESUMIDO' ? 3.0 : 7.6;

    taxes.push({
      name: 'PIS',
      rate: pisRate,
      estimatedValue: (annualRevenue * pisRate) / 100,
      dueDate: 'Mensal',
      observations: companyType === 'PJ_PRESUMIDO' ? 'Cumulativo' : 'Não cumulativo',
      type: 'FEDERAL'
    });

    taxes.push({
      name: 'COFINS',
      rate: cofinsRate,
      estimatedValue: (annualRevenue * cofinsRate) / 100,
      dueDate: 'Mensal',
      observations: companyType === 'PJ_PRESUMIDO' ? 'Cumulativo' : 'Não cumulativo',
      type: 'FEDERAL'
    });
  }

  // ICMS - Imposto sobre Circulação de Mercadorias
  if (sector === 'COMERCIO' || sector === 'INDUSTRIA') {
    const icmsRates: { [key: string]: number } = {
      'SP': 18, 'RJ': 20, 'MG': 18, 'RS': 17, 'PR': 19, 'SC': 17,
      'BA': 19, 'GO': 17, 'PE': 18, 'CE': 18, 'PA': 17, 'MA': 18,
      'PB': 18, 'ES': 17, 'PI': 18, 'AL': 18, 'SE': 18, 'RN': 18,
      'MT': 17, 'MS': 17, 'DF': 18, 'TO': 18, 'AC': 17, 'RO': 17.5,
      'RR': 17, 'AP': 18, 'AM': 18
    };

    const icmsRate = icmsRates[state] || 18;
    
    taxes.push({
      name: 'ICMS',
      rate: icmsRate,
      estimatedValue: (annualRevenue * icmsRate) / 100,
      dueDate: 'Mensal',
      observations: `Alíquota varia por estado - ${state}: ${icmsRate}%`,
      type: 'ESTADUAL'
    });
  }

  // ISS - Imposto sobre Serviços
  if (sector === 'SERVICOS') {
    const issRate = 5; // Alíquota média
    
    taxes.push({
      name: 'ISS',
      rate: issRate,
      estimatedValue: (annualRevenue * issRate) / 100,
      dueDate: 'Mensal',
      observations: 'Alíquota varia por município (2% a 5%)',
      type: 'MUNICIPAL'
    });
  }

  // INSS Patronal (para PJ)
  if (companyType !== 'PF' && companyType !== 'PJ_SIMPLES') {
    const inssRate = 20;
    const estimatedPayroll = annualRevenue * 0.30; // Estimativa de folha de pagamento
    
    taxes.push({
      name: 'INSS Patronal',
      rate: inssRate,
      estimatedValue: (estimatedPayroll * inssRate) / 100,
      dueDate: 'Mensal',
      observations: 'Sobre folha de pagamento estimada',
      type: 'FEDERAL'
    });
  }

  const totalEstimated = taxes.reduce((sum, tax) => sum + tax.estimatedValue, 0);
  
  const summary = `Para ${client.name}, com receita de R$ ${annualRevenue.toLocaleString('pt-BR')}, os impostos estimados são: ${taxes.slice(0, 3).map(t => t.name).join(', ')}${taxes.length > 3 ? ' e outros' : ''}.`;

  return {
    id: Date.now().toString(),
    client,
    taxes,
    totalEstimated,
    calculatedAt: new Date().toISOString(),
    summary
  };
}