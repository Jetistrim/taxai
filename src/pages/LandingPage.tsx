import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  Clock, 
  MessageSquare, 
  Users, 
  TrendingUp,
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-medium group-hover:shadow-large transition-all duration-300">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  TaxAI
                </h1>
              </div>
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#beneficios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Benefícios
              </a>
              <a href="#precos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Preços
              </a>
            </div>

            {/* CTA Button */}
            <Link to="/dashboard">
              <Button className="shadow-medium hover:shadow-large transition-all">
                Acessar o Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-accent px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Powered by AI</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Respostas fiscais em{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  segundos
                </span>
                , não em horas
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                TaxAI é a plataforma de IA que ajuda seu escritório a calcular impostos e responder dúvidas de clientes instantaneamente. Chega de planilhas complexas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto shadow-large hover:shadow-xl transition-all">
                    Comece a usar gratuitamente
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver demonstração
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Grátis para começar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Sem cartão de crédito</span>
                </div>
              </div>
            </div>

            {/* Visual/Mock */}
            <div className="relative">
              <div className="relative bg-gradient-surface rounded-2xl shadow-large p-8 border border-card-border">
                <div className="bg-card rounded-lg shadow-medium p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Consulta em andamento</p>
                      <p className="text-xs text-muted-foreground">Cliente: Empresa ABC Ltda</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {['IRPJ', 'CSLL', 'PIS', 'COFINS', 'ICMS'].map((tax, idx) => (
                      <div key={tax} className="flex items-center justify-between p-3 bg-accent rounded-lg animate-pulse" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <span className="text-sm font-medium text-foreground">{tax}</span>
                        <span className="text-sm text-primary font-semibold">Calculando...</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              O fim da espera para seu cliente
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforme a forma como seu escritório entrega consultoria fiscal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <Card className="border-card-border shadow-medium hover:shadow-large transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Economize Tempo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Calcule IRPJ, PIS, COFINS, ICMS e mais com um único formulário. O que levava horas agora leva minutos.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 2 */}
            <Card className="border-card-border shadow-medium hover:shadow-large transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Respostas Imediatas</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use nossa IA de chat para refinar cálculos e tirar dúvidas complexas em linguagem natural.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 3 */}
            <Card className="border-card-border shadow-medium hover:shadow-large transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Clientes Satisfeitos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Entregue relatórios claros e prazos de pagamento antes que o cliente precise pedir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Uma plataforma completa para suas consultas fiscais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todas as ferramentas que você precisa em um só lugar
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Cálculo Inteligente</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Cálculo Detalhado de Impostos
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Simule cenários (Simples Nacional, Lucro Presumido, Lucro Real) e veja alíquotas e valores devidos instantaneamente. Nossa IA considera todas as variáveis fiscais brasileiras.
                </p>
                <ul className="space-y-3">
                  {['Simples Nacional', 'Lucro Presumido', 'Lucro Real'].map((item) => (
                    <li key={item} className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="border-card-border shadow-large">
                <CardContent className="p-8">
                  <div className="bg-gradient-surface rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Regime</span>
                      <span className="text-sm font-semibold text-primary">Simples Nacional</span>
                    </div>
                    <div className="h-px bg-border"></div>
                    {[
                      { tax: 'IRPJ', rate: '15%', value: 'R$ 15.000' },
                      { tax: 'CSLL', rate: '9%', value: 'R$ 9.000' },
                      { tax: 'PIS', rate: '0.65%', value: 'R$ 650' }
                    ].map((item) => (
                      <div key={item.tax} className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{item.tax}</span>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{item.rate}</p>
                          <p className="font-semibold text-foreground">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="border-card-border shadow-large lg:order-1 order-2">
                <CardContent className="p-8">
                  <div className="bg-gradient-surface rounded-lg p-6 space-y-3">
                    {[
                      { client: 'ABC Comércio', date: '15 Jan', status: 'Concluído' },
                      { client: 'XYZ Serviços', date: '14 Jan', status: 'Concluído' },
                      { client: 'Tech Solutions', date: '13 Jan', status: 'Revisando' }
                    ].map((item) => (
                      <div key={item.client} className="flex items-center justify-between p-4 bg-card rounded-lg border border-card-border">
                        <div>
                          <p className="font-medium text-foreground">{item.client}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-6 lg:order-2 order-1">
                <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Histórico</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Histórico Inteligente
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Acesse e filtre todas as consultas feitas para seus clientes. Nunca perca informações importantes e mantenha um registro completo de todos os cálculos realizados.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">IA Conversacional</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Chat com IA
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pergunte em linguagem natural: "Quanto meu cliente X pagaria no Lucro Real?" Nossa IA entende contexto e fornece respostas precisas instantaneamente.
                </p>
              </div>
              <Card className="border-card-border shadow-large">
                <CardContent className="p-8">
                  <div className="bg-gradient-surface rounded-lg p-6 space-y-4">
                    <div className="flex space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg h-fit">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground">Você perguntou:</p>
                        <div className="bg-card p-3 rounded-lg border border-card-border">
                          <p className="text-sm text-foreground">
                            Quanto meu cliente com receita de R$ 500k pagaria no Simples Nacional?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <div className="bg-primary p-2 rounded-lg h-fit">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground">TaxAI respondeu:</p>
                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                          <p className="text-sm text-foreground">
                            Com receita de R$ 500.000, o total aproximado seria R$ 45.000 no Simples Nacional...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              O que contadores dizem sobre o TaxAI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Junte-se a centenas de profissionais que já transformaram sua rotina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Silva',
                role: 'Contadora Sênior',
                company: 'Contabilidade Silva & Associados',
                content: 'O TaxAI reduziu em 50% o tempo que gasto respondendo e-mails de clientes. Agora consigo focar em estratégias fiscais realmente importantes.'
              },
              {
                name: 'João Santos',
                role: 'Sócio',
                company: 'JS Contabilidade',
                content: 'Impressionante como a plataforma entende as particularidades do sistema tributário brasileiro. É como ter um especialista disponível 24/7.'
              },
              {
                name: 'Ana Costa',
                role: 'Consultora Fiscal',
                company: 'Costa Consultoria',
                content: 'Meus clientes adoram receber relatórios claros e precisos em minutos. A satisfação aumentou significativamente desde que começamos a usar o TaxAI.'
              }
            ].map((testimonial) => (
              <Card key={testimonial.name} className="border-card-border shadow-medium hover:shadow-large transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-card-border shadow-large bg-gradient-hero text-white overflow-hidden">
            <CardContent className="p-12 md:p-16 text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Transforme sua consultoria fiscal hoje
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Junte-se a centenas de contadores que já economizam horas por semana com o TaxAI. Comece gratuitamente, sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-large hover:shadow-xl">
                    Comece a usar gratuitamente
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                  <span className="text-sm text-white/80">Setup em 2 minutos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                  <span className="text-sm text-white/80">Cancele quando quiser</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="precos" className="bg-gradient-surface border-t border-card-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg shadow-medium">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  TaxAI
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Inteligência fiscal para contadores modernos.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a></li>
                <li><a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Benefícios</a></li>
                <li><a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-card-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaxAI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}