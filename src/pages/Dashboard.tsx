import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Users, 
  ArrowRight,
  Sparkles,
  Clock,
  Shield
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTax } from '@/contexts/TaxContext';

export function Dashboard() {
  const { calculations } = useTax();

  const recentCalculations = calculations.slice(0, 3);
  const totalCalculations = calculations.length;
  const totalClientsServed = new Set(calculations.map(c => c.client.name)).size;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="mx-auto bg-gradient-primary p-4 rounded-full w-fit mb-6 shadow-large">
          <Calculator className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Bem-vindo ao <span className="bg-gradient-primary bg-clip-text text-transparent">TaxAI</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Inteligência artificial para cálculo rápido e preciso de impostos e taxas. 
          Ajude seus clientes a entenderem exatamente que tributos devem pagar ao governo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/client-form">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium hover:shadow-large transition-all duration-300 text-lg px-8 py-6">
              <Calculator className="mr-2 h-5 w-5" />
              Iniciar Nova Consulta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          {totalCalculations > 0 && (
            <Link to="/history">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
                <FileText className="mr-2 h-5 w-5" />
                Ver Histórico ({totalCalculations})
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-medium border-card-border hover:shadow-large transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consultas Realizadas
            </CardTitle>
            <Calculator className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalCalculations}</div>
            <p className="text-xs text-muted-foreground">
              Total de cálculos de impostos
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-card-border hover:shadow-large transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Atendidos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalClientsServed}</div>
            <p className="text-xs text-muted-foreground">
              Pessoas e empresas diferentes
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-card-border hover:shadow-large transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Economia Estimada
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">15%</div>
            <p className="text-xs text-muted-foreground">
              Através de planejamento fiscal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-medium border-card-border bg-gradient-surface">
          <CardHeader>
            <div className="bg-primary/10 p-2 rounded-lg w-fit mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">IA Especializada</CardTitle>
            <CardDescription>
              Algoritmos treinados com legislação fiscal brasileira atualizada
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-medium border-card-border bg-gradient-surface">
          <CardHeader>
            <div className="bg-primary/10 p-2 rounded-lg w-fit mb-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Resultados Rápidos</CardTitle>
            <CardDescription>
              Cálculos precisos em segundos, economizando tempo valioso
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-medium border-card-border bg-gradient-surface">
          <CardHeader>
            <div className="bg-primary/10 p-2 rounded-lg w-fit mb-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Conformidade Legal</CardTitle>
            <CardDescription>
              Baseado nas normas da Receita Federal e legislação vigente
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Calculations */}
      {recentCalculations.length > 0 && (
        <Card className="shadow-medium border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Consultas Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimos cálculos realizados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalculations.map((calc) => (
                <div 
                  key={calc.id}
                  className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer"
                  onClick={() => {/* Navigate to detailed view */}}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{calc.client.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {calc.taxes.length} impostos • {' '}
                        R$ {calc.totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(calc.calculatedAt).toLocaleDateString('pt-BR')}
                    </p>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
            
            {totalCalculations > 3 && (
              <div className="pt-4 border-t border-card-border mt-4">
                <Link to="/history">
                  <Button variant="outline" className="w-full">
                    Ver Todas as Consultas ({totalCalculations})
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* CTA Section */}
      <Card className="shadow-large border-card-border bg-gradient-hero text-white">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Simplificar o Cálculo de Impostos?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Insira os dados do seu cliente e descubra todos os impostos e taxas aplicáveis
          </p>
          <Link to="/client-form">
            <Button size="lg" variant="secondary" className="bg-white text-brand-dark hover:bg-white/90 shadow-large text-lg px-8 py-6">
              <Calculator className="mr-2 h-5 w-5" />
              Começar Agora
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}