import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CargoCard, StatusBadge } from '@/components/CargoCard';
import { Screen, SectionHeading, palette } from '@/components/Screen';
import { useCargas } from '@/context/CargasContext';
import type { CargoStatus } from '@/data/cargas';

const filtros: ('Todas' | CargoStatus)[] = ['Todas', 'Pendente', 'Em andamento', 'Concluída'];

export default function SolicitacoesScreen() {
  const { cargas } = useCargas();
  const [filtro, setFiltro] = useState<'Todas' | CargoStatus>('Todas');
  const solicitacoes = useMemo(
    () => filtro === 'Todas' ? cargas : cargas.filter((cargo) => cargo.status === filtro),
    [cargas, filtro],
  );
  const pendentes = cargas.filter((cargo) => cargo.status === 'Pendente').length;

  return (
    <Screen title="Minhas solicitações" subtitle="Acompanhe coletas e transportes da sua operação.">
      <View style={styles.summary}>
        <View style={styles.summaryText}>
          <Text style={styles.summaryEyebrow}>ACOMPANHAMENTO</Text>
          <Text style={styles.summaryTitle}>Solicitações de transporte</Text>
          <Text style={styles.summaryDescription}>
            {pendentes} {pendentes === 1 ? 'solicitação aguarda' : 'solicitações aguardam'} aceite.
          </Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalNumber}>{cargas.length}</Text>
          <Text style={styles.totalLabel}>total</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {filtros.map((item) => {
          const selecionado = filtro === item;
          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: selecionado }}
              onPress={() => setFiltro(item)}
              style={[styles.filterChip, selecionado && styles.filterChipActive]}>
              <Text style={[styles.filterText, selecionado && styles.filterTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <SectionHeading title="Histórico de solicitações" />
      <Text style={styles.countText}>{solicitacoes.length} registros</Text>
      {solicitacoes.length ? (
        solicitacoes.map((cargo) => (
          <View key={cargo.id} style={styles.requestCard}>
            <View style={styles.requestHeading}>
              <View>
                <Text style={styles.requestNumber}>Solicitação #{cargo.id + 1022}</Text>
                <Text style={styles.requestName}>{cargo.nome}</Text>
              </View>
              <StatusBadge status={cargo.status} />
            </View>
            <CargoCard cargo={cargo} />
          </View>
        ))
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Não há solicitações neste status.</Text>
          <Text style={styles.emptyText}>Escolha outro filtro para consultar seu histórico.</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#713400',
    backgroundColor: '#A94B00',
    padding: 16,
    marginBottom: 14,
    experimental_backgroundImage: 'linear-gradient(100deg, #FF7900 0%, #542500 100%)',
  },
  summaryText: {
    flex: 1,
    gap: 5,
  },
  summaryEyebrow: {
    color: '#FFE0C2',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  summaryTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  summaryDescription: {
    color: '#F5D6BC',
    fontSize: 11,
  },
  totalBadge: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(20,10,2,0.32)',
  },
  totalNumber: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '800',
  },
  totalLabel: {
    color: '#FFE0C2',
    fontSize: 9,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 19,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#47301E',
    borderRadius: 18,
    backgroundColor: '#160F08',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    borderColor: '#A85400',
    backgroundColor: '#3A1C00',
  },
  filterText: {
    color: '#C6B8AB',
    fontSize: 11,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFB36E',
  },
  countText: {
    color: palette.secondary,
    fontSize: 11,
    marginTop: -6,
    marginBottom: 12,
  },
  requestCard: {
    marginBottom: 1,
  },
  requestHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderColor: '#3D2612',
    borderBottomWidth: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: '#1A0C00',
    padding: 12,
  },
  requestNumber: {
    color: '#FFAA60',
    fontSize: 10,
    fontWeight: '700',
  },
  requestName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },
  empty: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D2612',
    borderRadius: 12,
    backgroundColor: '#100A04',
    padding: 20,
  },
  emptyTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyText: {
    color: '#B9AAA0',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
});
