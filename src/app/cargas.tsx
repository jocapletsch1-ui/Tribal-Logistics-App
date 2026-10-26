import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';

import { CargoCard, StatusBadge } from '@/components/CargoCard';
import { Screen, SectionHeading, palette } from '@/components/Screen';
import { useCargas } from '@/context/CargasContext';
import { categorias } from '@/data/cargas';
import type { CargoStatus } from '@/data/cargas';
import { useIsDesktop } from '@/hooks/use-is-desktop';

const statusOptions: ('Todos' | CargoStatus)[] = ['Todos', 'Pendente', 'Em andamento', 'Concluída'];

export default function CargasScreen() {
  const { cargas } = useCargas();
  const desktop = useIsDesktop();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState<'Todos' | CargoStatus>('Todos');
  const [data, setData] = useState('');
  const [pagina, setPagina] = useState(1);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR');
    const dataBusca = data.trim();

    return cargas.filter((carga) => {
      const correspondeNome = !termo || carga.nome.toLocaleLowerCase('pt-BR').includes(termo);
      const correspondeCategoria = !categoria || carga.categoria === categoria;
      const correspondeStatus = status === 'Todos' || carga.status === status;
      const correspondeData = !dataBusca || carga.dataColeta === dataBusca;
      return correspondeNome && correspondeCategoria && correspondeStatus && correspondeData;
    });
  }, [busca, cargas, categoria, data, status]);

  function limparFiltros() {
    setBusca('');
    setCategoria('');
    setStatus('Todos');
    setData('');
    setPagina(1);
  }

  return (
    <Screen
      title="Lista de cargas"
      subtitle="Consulte, acompanhe e gerencie os registros da sua operação."
      action={
        <Link href="/nova-carga" asChild>
          <Pressable accessibilityRole="button" style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Nova carga</Text>
          </Pressable>
        </Link>
      }>
      <View style={[styles.filterPanel, desktop && styles.desktopFilterPanel]}>
        <Text style={styles.fieldLabel}>Buscar por nome</Text>
        <TextInput
          accessibilityLabel="Buscar carga pelo nome"
          value={busca}
          onChangeText={(value) => {
            setBusca(value);
            setPagina(1);
          }}
          placeholder="Ex.: transporte de milho"
          placeholderTextColor="#747779"
          style={styles.input}
          returnKeyType="search"
        />

        <FilterSelect
          label="Categoria"
          value={categoria || 'Todas as categorias'}
          options={['Todas as categorias', ...categorias]}
          onSelect={(value) => {
            setCategoria(value === 'Todas as categorias' ? '' : value);
            setPagina(1);
          }}
        />
        <FilterSelect
          label="Status"
          value={status === 'Todos' ? 'Todos os status' : status}
          options={statusOptions.map((item) => item === 'Todos' ? 'Todos os status' : item)}
          onSelect={(value) => {
            setStatus(statusOptions.find((item): item is CargoStatus => item !== 'Todos' && item === value) ?? 'Todos');
            setPagina(1);
          }}
        />

        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.fieldLabel}>Data de coleta</Text>
            <TextInput
              accessibilityLabel="Filtrar pela data de coleta"
              value={data}
              onChangeText={(value) => {
                setData(value);
                setPagina(1);
              }}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#747779"
              style={styles.input}
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
          </View>
          <Pressable accessibilityRole="button" onPress={limparFiltros} style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </Pressable>
        </View>
        <View style={styles.filterActions}>
          <Pressable accessibilityRole="button" onPress={() => setPagina(1)} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </Pressable>
        </View>
      </View>

      <SectionHeading title="Cargas cadastradas" />
      <Text style={styles.resultCount}>Todos os registros · {filtradas.length} cargas encontradas</Text>
      {filtradas.length > 0 ? (
        desktop ? (
          <View style={styles.tablePanel}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
              <Text style={[styles.tableHeaderText, styles.nameColumn]}>Carga</Text>
              <Text style={[styles.tableHeaderText, styles.categoryColumn]}>Categoria</Text>
              <Text style={[styles.tableHeaderText, styles.statusColumn]}>Status</Text>
              <Text style={[styles.tableHeaderText, styles.dateColumn]}>Data de coleta</Text>
            </View>
            {filtradas.map((cargo) => (
              <Link
                key={cargo.id}
                href={{ pathname: '/detalhe-carga', params: { cargoId: String(cargo.id) } }}
                asChild>
                <Pressable accessibilityRole="link" style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.idColumn]}>#{String(cargo.id).padStart(4, '0')}</Text>
                  <Text style={[styles.tableCell, styles.nameColumn]} numberOfLines={1}>{cargo.nome}</Text>
                  <Text style={[styles.tableCell, styles.categoryColumn]}>{cargo.categoria}</Text>
                  <View style={styles.statusColumn}>
                    <StatusBadge status={cargo.status} />
                  </View>
                  <Text style={[styles.tableCell, styles.dateColumn]}>{formatarData(cargo.dataColeta)}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        ) : (
          filtradas.slice((pagina - 1) * 5, pagina * 5).map((cargo) => (
            <CargoCard key={cargo.id} cargo={cargo} />
          ))
        )
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhuma carga encontrada</Text>
          <Text style={styles.emptyDescription}>Ajuste os filtros ou limpe a busca para ver todos os registros.</Text>
          <Pressable onPress={limparFiltros} style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>Limpar filtros</Text>
          </Pressable>
        </View>
      )}
      {!desktop && filtradas.length > 0 ? (
        <View style={styles.pagination}>
          <Pressable
            accessibilityRole="button"
            disabled={pagina === 1}
            onPress={() => setPagina((atual) => Math.max(1, atual - 1))}
            style={styles.pageArrow}>
            <Text style={styles.pageText}>‹</Text>
          </Pressable>
          {Array.from({ length: Math.ceil(filtradas.length / 5) }, (_, index) => index + 1).map((numero) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: pagina === numero }}
              key={numero}
              onPress={() => setPagina(numero)}
              style={[styles.pageButton, pagina === numero && styles.activePageButton]}>
              <Text style={[styles.pageText, pagina === numero && styles.activePageText]}>{numero}</Text>
            </Pressable>
          ))}
          <Pressable
            accessibilityRole="button"
            disabled={pagina === Math.ceil(filtradas.length / 5)}
            onPress={() => setPagina((atual) => Math.min(Math.ceil(filtradas.length / 5), atual + 1))}
            style={styles.pageArrow}>
            <Text style={styles.pageText}>›</Text>
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
}

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function FilterSelect({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  const [aberta, setAberta] = useState(false);

  return (
    <View style={styles.selectField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: aberta }}
        onPress={() => setAberta((atual) => !atual)}
        style={styles.selectButton}>
        <Text style={styles.selectValue}>{value}</Text>
        <Text style={styles.selectArrow}>⌄</Text>
      </Pressable>
      {aberta ? (
        <View style={styles.selectOptions}>
          {options.map((option) => (
            <Pressable
              accessibilityRole="button"
              key={option}
              onPress={() => {
                onSelect(option);
                setAberta(false);
              }}
              style={styles.selectOption}>
              <Text style={styles.selectOptionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    alignSelf: 'flex-end',
    backgroundColor: palette.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  createButtonText: {
    color: '#160B02',
    fontSize: 8,
    fontWeight: '800',
  },
  filterPanel: {
    backgroundColor: '#100A04',
    borderColor: '#493018',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  desktopFilterPanel: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#100C08',
  },
  fieldLabel: {
    color: '#E7DED4',
    fontSize: 8,
    fontWeight: '600',
    marginBottom: 3,
  },
  input: {
    minHeight: 27,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#76634F',
    backgroundColor: '#17110B',
    color: palette.text,
    fontSize: 8,
    paddingHorizontal: 7,
  },
  filterLabel: {
    marginTop: 8,
  },
  chips: {
    gap: 7,
    paddingRight: 4,
  },
  statusFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#373A3C',
    backgroundColor: '#191B1D',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  selectedChip: {
    backgroundColor: '#3A2818',
    borderColor: '#9A5927',
  },
  chipText: {
    color: '#B4B6B7',
    fontSize: 11,
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#FFB36E',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 8,
  },
  dateField: {
    flex: 1,
  },
  clearButton: {
    minHeight: 27,
    paddingHorizontal: 7,
    justifyContent: 'center',
  },
  clearText: {
    color: palette.accent,
    fontSize: 8,
    fontWeight: '700',
  },
  filterActions: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  filterButton: {
    minWidth: 62,
    minHeight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FF8500',
  },
  filterButtonText: {
    color: '#17100A',
    fontSize: 8,
    fontWeight: '700',
  },
  selectField: {
    marginTop: 8,
  },
  selectButton: {
    minHeight: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#76634F',
    borderRadius: 4,
    paddingHorizontal: 7,
    backgroundColor: '#17110B',
  },
  selectValue: {
    color: '#FFF',
    fontSize: 8,
  },
  selectArrow: {
    color: '#FFF',
    fontSize: 12,
  },
  selectOptions: {
    zIndex: 5,
    borderWidth: 1,
    borderColor: '#493018',
    borderRadius: 4,
    backgroundColor: '#21150B',
  },
  selectOption: {
    minHeight: 25,
    justifyContent: 'center',
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#352416',
  },
  selectOptionText: {
    color: '#FFF',
    fontSize: 8,
  },
  resultCount: {
    color: palette.secondary,
    fontSize: 8,
    marginTop: -4,
    marginBottom: 7,
  },
  tablePanel: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: '#100A04',
  },
  tableHeader: {
    minHeight: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#502400',
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  tableRow: {
    minHeight: 39,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
  },
  tableCell: {
    color: '#F4F4F2',
    fontSize: 10,
    paddingRight: 8,
  },
  idColumn: {
    width: '12%',
    color: '#AAA19A',
  },
  nameColumn: {
    width: '34%',
    fontWeight: '700',
  },
  categoryColumn: {
    width: '17%',
  },
  statusColumn: {
    width: '19%',
    alignItems: 'flex-start',
  },
  dateColumn: {
    width: '18%',
  },
  emptyState: {
    borderRadius: 14,
    backgroundColor: '#131516',
    borderColor: '#282A2C',
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  emptyTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    color: palette.secondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 7,
  },
  emptyButton: {
    backgroundColor: palette.accentSoft,
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 15,
  },
  emptyButtonText: {
    color: '#FFB36E',
    fontSize: 12,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginVertical: 8,
  },
  pageButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#493018',
    borderRadius: 4,
    backgroundColor: '#100A04',
  },
  activePageButton: {
    borderColor: '#FF7700',
    backgroundColor: '#FF7700',
  },
  pageArrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageText: {
    color: '#E6E6E3',
    fontSize: 11,
  },
  activePageText: {
    color: '#160B02',
    fontWeight: '800',
  },
});
