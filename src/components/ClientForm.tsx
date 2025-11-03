import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Calculator, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Client, BRAZILIAN_STATES, COMPANY_TYPES, SECTORS } from '@/types/tax';
import { calculateTaxes } from '@/utils/taxCalculations';
import { useTax } from '@/contexts/TaxContext';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  companyType: z.enum(['PF', 'PJ_SIMPLES', 'PJ_PRESUMIDO', 'PJ_REAL']),
  annualRevenue: z.number().min(0, 'Receita deve ser positiva'),
  state: z.string().min(2, 'Selecione um estado'),
  sector: z.enum(['COMERCIO', 'SERVICOS', 'INDUSTRIA', 'AGRONEGOCIO']),
  referenceDate: z.date(),
});

type FormData = z.infer<typeof formSchema>;

export function ClientForm() {
  const [isCalculating, setIsCalculating] = useState(false);
  const { addCalculation } = useTax();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      annualRevenue: 0,
      state: '',
      referenceDate: new Date(),
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsCalculating(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const client: Client = {
        id: Date.now().toString(),
        name: data.name,
        companyType: data.companyType,
        annualRevenue: data.annualRevenue,
        state: data.state,
        sector: data.sector,
        referenceDate: format(data.referenceDate, 'yyyy-MM'),
        createdAt: new Date().toISOString(),
      };

      const calculation = calculateTaxes(client);
      addCalculation(calculation);

      toast({
        title: "Cálculo realizado com sucesso!",
        description: `Encontrados ${calculation.taxes.length} impostos aplicáveis para ${client.name}.`,
      });

      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Erro no cálculo",
        description: "Ocorreu um erro ao processar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-large border-card-border">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto bg-gradient-primary p-3 rounded-full w-fit mb-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Dados do Cliente
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Preencha as informações para calcular impostos e taxas
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Nome do Cliente */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Nome do Cliente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome completo"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Nome da pessoa física ou razão social da empresa
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de Empresa */}
              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Tipo de Empresa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMPANY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Categoria fiscal do cliente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Receita Bruta Anual */}
                <FormField
                  control={form.control}
                  name="annualRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Receita Bruta Anual</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            R$
                          </span>
                          <Input
                            type="number"
                            placeholder="0,00"
                            className="h-12 pl-10"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Faturamento total no ano
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estado */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Estado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="UF" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BRAZILIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Estado de operação
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Setor */}
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Setor de Atividade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecione o setor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SECTORS.map((sector) => (
                            <SelectItem key={sector.value} value={sector.value}>
                              {sector.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Área de atuação principal
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data de Referência */}
                <FormField
                  control={form.control}
                  name="referenceDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Data de Referência</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-12 justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "MMMM 'de' yyyy", { locale: ptBR })
                              ) : (
                                <span>Selecione o mês/ano</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("2020-01-01")
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Período para cálculo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:opacity-90 shadow-medium hover:shadow-large transition-all duration-300"
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Consultando IA...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-5 w-5" />
                      Consultar IA
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}