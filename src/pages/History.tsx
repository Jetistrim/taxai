import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar,
  Building,
  DollarSign,
  Eye,
  Trash2,
  Download
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTax } from '@/contexts/TaxContext';
import { useToast } from '@/hooks/use-toast';
import { COMPANY_TYPES, SECTORS } from '@/types/tax';

export function History() {
  const { calculations, setCurrentCalculation } = useTax();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSector, setFilterSector] = useState('all');

  const filteredCalculations = calculations.filter(calc => {
    const matchesSearch = calc.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || calc.client.companyType === filterType;
    const matchesSector = filterSector === 'all' || calc.client.sector === filterSector;
    
    return matchesSearch && matchesType && matchesSector;
  });

  const handleViewCalculation = (calculation: any) => {
    setCurrentCalculation(calculation);
    toast({
      title: "Cálculo carregado",
      description: `Visualizando resultados para ${calculation.client.name}`,
    });
  };

  const handleDeleteCalculation = (calculationId: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A exclusão de cálculos será implementada em breve.",
    });
  };

  const handleExportCalculation = (calculation: any) => {
    toast({
      title: "Exportação em desenvolvimento",
      description: "A funcionalidade de exportação será implementada em breve.",
    });
  };

  if (calculations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-medium border-card-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-20 w-20 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nenhum histórico encontrado
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Você ainda não realizou nenhuma consulta de impostos.
              Comece calculando os tributos do seu primeiro cliente!
            </p>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Building className="mr-2 h-5 w-5" />
              Cadastrar Primeiro Cliente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Histórico de Consultas</h1>
          <p className="text-muted-foreground">
            {calculations.length} consulta{calculations.length !== 1 ? 's' : ''} realizada{calculations.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo de empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {COMPANY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterSector} onValueChange={setFilterSector}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os setores</SelectItem>
              {SECTORS.map((sector) => (
                <SelectItem key={sector.value} value={sector.value}>
                  {sector.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {filteredCalculations.length === 0 ? (
        <Card className="shadow-medium border-card-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-muted-foreground text-center">
              Tente ajustar os filtros ou termo de busca.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCalculations.map((calculation) => (
            <Card 
              key={calculation.id} 
              className="shadow-medium border-card-border hover:shadow-large transition-all duration-300 cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {calculation.client.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {COMPANY_TYPES.find(t => t.value === calculation.client.companyType)?.label} • {' '}
                      {SECTORS.find(s => s.value === calculation.client.sector)?.label}
                    </CardDescription>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {calculation.client.state}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(calculation.calculatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Summary */}
                <div className="bg-accent rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Receita Anual</p>
                        <p className="font-semibold text-sm">
                          R$ {calculation.client.annualRevenue.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Total Estimado</p>
                        <p className="font-semibold text-sm text-primary">
                          R$ {calculation.totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Taxes Preview */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Impostos Identificados ({calculation.taxes.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {calculation.taxes.slice(0, 4).map((tax, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tax.name}
                      </Badge>
                    ))}
                    {calculation.taxes.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{calculation.taxes.length - 4} mais
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-card-border">
                  <Button
                    size="sm"
                    onClick={() => handleViewCalculation(calculation)}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    Visualizar
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleExportCalculation(calculation)}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Exportar
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteCalculation(calculation.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}