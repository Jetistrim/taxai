import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Calendar,
  Building,
  MapPin,
  DollarSign
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTax } from '@/contexts/TaxContext';
import { ChatBox } from './ChatBox';
import { useToast } from '@/hooks/use-toast';

const getTypeColor = (type: string) => {
  switch (type) {
    case 'FEDERAL': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ESTADUAL': return 'bg-green-100 text-green-800 border-green-200';
    case 'MUNICIPAL': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function ResultsArea() {
  const { currentCalculation } = useTax();
  const { toast } = useToast();

  if (!currentCalculation) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-medium border-card-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum cálculo disponível
            </h3>
            <p className="text-muted-foreground text-center">
              Preencha o formulário de dados do cliente para ver os resultados aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { client, taxes, totalEstimated, summary, calculatedAt } = currentCalculation;

  const handleGeneratePDF = () => {
    toast({
      title: "Relatório em desenvolvimento",
      description: "A funcionalidade de geração de PDF será implementada em breve.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Summary Card */}
      <Card className="shadow-large border-card-border bg-gradient-surface">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Resultado da Consulta
              </CardTitle>
              <CardDescription className="text-base">
                {summary}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Estimado</p>
              <p className="text-3xl font-bold text-primary">
                R$ {totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Cliente</p>
                <p className="font-medium text-sm">{client.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Receita Anual</p>
                <p className="font-medium text-sm">
                  R$ {client.annualRevenue.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Estado</p>
                <p className="font-medium text-sm">{client.state}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Calculado em</p>
                <p className="font-medium text-sm">
                  {format(new Date(calculatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGeneratePDF} className="bg-gradient-primary hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Gerar Relatório PDF
            </Button>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Análise Detalhada
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Taxes Table */}
      <Card className="shadow-medium border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Impostos e Taxas Aplicáveis</span>
          </CardTitle>
          <CardDescription>
            Detalhamento completo dos tributos devidos ao governo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Imposto/Taxa</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold text-right">Alíquota</TableHead>
                  <TableHead className="font-semibold text-right">Valor Estimado</TableHead>
                  <TableHead className="font-semibold">Prazo</TableHead>
                  <TableHead className="font-semibold">Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxes.map((tax, index) => (
                  <TableRow key={index} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium">{tax.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(tax.type)}>
                        {tax.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {tax.rate.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      R$ {tax.estimatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-sm">{tax.dueDate}</TableCell>
                    <TableCell className="text-sm max-w-xs">
                      <div className="truncate" title={tax.observations}>
                        {tax.observations}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Total de {taxes.length} impostos encontrados
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Estimado</p>
              <p className="text-xl font-bold text-primary">
                R$ {totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Integration */}
      <ChatBox />
    </div>
  );
}