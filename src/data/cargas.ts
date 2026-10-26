export type CargoStatus = 'Pendente' | 'Em andamento' | 'Concluída';

export type Cargo = {
  id: number;
  nome: string;
  categoria: string;
  status: CargoStatus;
  dataColeta: string;
  dataEntrega?: string;
  origem: string;
  destino: string;
  peso: number;
  valor: number;
  observacoes: string;
};

export type NovaCarga = Omit<Cargo, 'id' | 'status'>;

export const categorias = [
  'Grãos',
  'Insumos',
  'Madeira',
  'Alimentos',
  'Construção',
  'Líquidos',
  'Fibras',
  'Minérios',
];

const cargasIniciais: (
  Pick<Cargo, 'nome' | 'categoria' | 'status' | 'dataColeta'>
)[] = [
  { nome: 'Carga de soja', categoria: 'Grãos', status: 'Concluída', dataColeta: '2026-10-20' },
  { nome: 'Transporte de milho', categoria: 'Grãos', status: 'Pendente', dataColeta: '2026-10-22' },
  { nome: 'Carga de fertilizantes', categoria: 'Insumos', status: 'Em andamento', dataColeta: '2026-10-23' },
  { nome: 'Transporte de madeira', categoria: 'Madeira', status: 'Concluída', dataColeta: '2026-10-24' },
  { nome: 'Carga de trigo', categoria: 'Grãos', status: 'Pendente', dataColeta: '2026-10-25' },
  { nome: 'Transporte de arroz', categoria: 'Grãos', status: 'Em andamento', dataColeta: '2026-10-26' },
  { nome: 'Carga de adubo químico', categoria: 'Insumos', status: 'Pendente', dataColeta: '2026-10-27' },
  { nome: 'Transporte de calcário', categoria: 'Insumos', status: 'Concluída', dataColeta: '2026-10-28' },
  { nome: 'Carga de eucalipto', categoria: 'Madeira', status: 'Em andamento', dataColeta: '2026-10-29' },
  { nome: 'Transporte de pinus', categoria: 'Madeira', status: 'Pendente', dataColeta: '2026-10-30' },
  { nome: 'Carga de açúcar', categoria: 'Alimentos', status: 'Concluída', dataColeta: '2026-10-31' },
  { nome: 'Transporte de café', categoria: 'Alimentos', status: 'Pendente', dataColeta: '2026-11-01' },
  { nome: 'Carga de cimento', categoria: 'Construção', status: 'Em andamento', dataColeta: '2026-11-02' },
  { nome: 'Transporte de areia', categoria: 'Construção', status: 'Concluída', dataColeta: '2026-11-03' },
  { nome: 'Carga de brita', categoria: 'Construção', status: 'Pendente', dataColeta: '2026-11-04' },
  { nome: 'Transporte de óleo vegetal', categoria: 'Líquidos', status: 'Em andamento', dataColeta: '2026-11-05' },
  { nome: 'Carga de leite', categoria: 'Líquidos', status: 'Pendente', dataColeta: '2026-11-06' },
  { nome: 'Transporte de algodão', categoria: 'Fibras', status: 'Concluída', dataColeta: '2026-11-07' },
  { nome: 'Carga de minério de ferro', categoria: 'Minérios', status: 'Em andamento', dataColeta: '2026-11-08' },
  { nome: 'Transporte de cobre', categoria: 'Minérios', status: 'Pendente', dataColeta: '2026-11-09' },
];

const rotas = [
  ['Curitiba', 'Joinville'],
  ['Ponta Grossa', 'Curitiba'],
  ['Joinville', 'Blumenau'],
  ['Araucária', 'Itajaí'],
  ['Curitiba', 'Londrina'],
  ['Maringá', 'Cascavel'],
  ['Itajaí', 'Joinville'],
  ['Blumenau', 'Curitiba'],
  ['Londrina', 'Maringá'],
  ['Cascavel', 'Ponta Grossa'],
];

export const cargasIniciaisData: Cargo[] = cargasIniciais.map((carga, index) => ({
  ...carga,
  id: index + 1,
  origem: rotas[index % rotas.length][0],
  destino: rotas[index % rotas.length][1],
  peso: 12 + (index % 8) * 3,
  valor: 18000 + index * 2450,
  observacoes: '',
}));

export function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

export function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}
