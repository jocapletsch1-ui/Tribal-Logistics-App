import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CargoCard } from '@/components/CargoCard';
import { Screen, SectionHeading, palette } from '@/components/Screen';
import { useCargas } from '@/context/CargasContext';
import type { CargoStatus } from '@/data/cargas';
import { useIsDesktop } from '@/hooks/use-is-desktop';

const statusResumo: CargoStatus[] = ['Pendente', 'Em andamento', 'Concluída'];

export default function DashboardScreen() {
  const { cargas } = useCargas();
  const desktop = useIsDesktop();
  const contagem = statusResumo.map((status) => ({
    status,
    total: cargas.filter((carga) => carga.status === status).length,
  }));
  const indicadores = [
    { label: 'Total de cargas', value: cargas.length, detail: 'Registros na operação' },
    { label: 'Pendentes', value: contagem[0].total, detail: 'Aguardando aceite' },
    { label: 'Em andamento', value: contagem[1].total, detail: 'Em transporte' },
    { label: 'Concluídas', value: contagem[2].total, detail: 'Entregas finalizadas' },
  ];

  return (
    <Screen
      title="Dashboard"
      subtitle="Olá, Cristian. Acompanhe sua operação em tempo real."
      action={
        <Link href="/nova-carga" asChild>
          <Pressable accessibilityRole="button" style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Nova carga</Text>
          </Pressable>
        </Link>
      }>
      <View style={[styles.metrics, desktop && styles.desktopMetrics]}>
        {indicadores.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.metric,
              desktop && styles.desktopMetric,
              index === 0 && styles.metricHighlight,
            ]}>
            <Text style={styles.metricValue}>
              {item.value}
            </Text>
            <Text style={styles.metricLabel}>{item.label}</Text>
            <Text style={styles.metricDetail}>{item.detail}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.statusPanel, desktop && styles.desktopChart]}>
        <SectionHeading title="Cargas por status" />
        <View style={styles.donutRow}>
          <View style={styles.donut}>
            <View style={styles.donutAccent} />
            <View style={styles.donutCenter}>
              <Text style={styles.donutTotal}>{cargas.length}</Text>
              <Text style={styles.donutLabel}>cargas</Text>
            </View>
          </View>
          <View style={styles.legend}>
            {contagem.map((item, index) => (
              <View key={item.status} style={styles.legendItem}>
                <View style={[
                  styles.legendMarker,
                  index === 0 ? styles.legendPending : index === 1 ? styles.legendTransit : styles.legendDone,
                ]} />
                <View>
                  <Text style={styles.statusName}>{item.status}</Text>
                  <Text style={styles.statusCount}>{item.total} · {cargas.length ? Math.round(item.total / cargas.length * 100) : 0}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.mapPanel}>
        <View style={styles.mapCanvas}>
          <View style={styles.mapGrid} />
          <View style={[styles.routeLine, styles.routeLineOne]} />
          <View style={[styles.routeLine, styles.routeLineTwo]} />
          <View style={styles.mapNodeOne}><Text style={styles.mapNodeText}>●</Text></View>
          <View style={styles.mapNodeTwo}><Text style={styles.mapNodeText}>●</Text></View>
          <View style={styles.mapNodeThree}><Text style={styles.mapNodeText}>●</Text></View>
          <Text style={styles.mapCityOne}>Curitiba</Text>
          <Text style={styles.mapCityTwo}>Joinville</Text>
          <Text style={styles.mapCityThree}>Londrina</Text>
        </View>
        <View style={styles.vehicleSummary}>
          <Text style={styles.vehicleCount}>3</Text>
          <Text style={styles.vehicleLabel}>veículos ativos hoje</Text>
        </View>
        {cargas.filter((carga) => carga.status === 'Em andamento').slice(0, 2).map((carga) => (
          <View key={carga.id} style={styles.vehicleRow}>
            <Text style={styles.vehicleIcon}>▣</Text>
            <View style={styles.vehicleRoute}>
              <Text style={styles.vehicleTitle} numberOfLines={1}>{carga.nome}</Text>
              <Text style={styles.vehicleSubtext}>{carga.origem} → {carga.destino}</Text>
            </View>
            <Text style={styles.vehicleStatus}>Em rota</Text>
          </View>
        ))}
      </View>

      <View style={styles.latestSection}>
        <SectionHeading
          title="Últimas cargas"
          action={
            <Link href="/cargas" asChild>
              <Pressable hitSlop={8}>
                <Text style={styles.seeAll}>Ver todas →</Text>
              </Pressable>
            </Link>
          }
        />
        {desktop ? (
          <View style={styles.latestPanel}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
              <Text style={[styles.tableHeaderText, styles.cargoColumn]}>Carga</Text>
              <Text style={[styles.tableHeaderText, styles.routeColumn]}>Origem → Destino</Text>
              <Text style={[styles.tableHeaderText, styles.tableStatusColumn]}>Status</Text>
            </View>
            {cargas.slice(0, 8).map((cargo) => (
              <Link
                key={cargo.id}
                href={{ pathname: '/detalhe-carga', params: { cargoId: String(cargo.id) } }}
                asChild>
                <Pressable accessibilityRole="link" style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.idColumn]}>#{cargo.id + 1022}</Text>
                  <Text style={[styles.tableCell, styles.cargoColumn]} numberOfLines={1}>{cargo.nome}</Text>
                  <Text style={[styles.tableCell, styles.routeColumn]} numberOfLines={1}>
                    {cargo.origem} → {cargo.destino}
                  </Text>
                  <View style={styles.tableStatusColumn}>
                    <CargoCardStatus status={cargo.status} />
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        ) : (
          cargas.slice(0, 5).map((cargo) => <CargoCard key={cargo.id} cargo={cargo} />)
        )}
      </View>

      <View style={styles.operationPanel}>
        <SectionHeading title="Sua operação hoje" />
        <OperationItem title={`${contagem[0].total} cargas previstas`} detail="Coletas e entregas organizadas" />
        <OperationItem title={`${contagem[1].total} cargas em rota`} detail="Acompanhamento em tempo real" />
        <OperationItem title="Nenhuma ocorrência" detail="Tudo dentro do planejado" />
      </View>
    </Screen>
  );
}

function OperationItem({ title, detail }: { title: string; detail: string }) {
  return (
    <View style={styles.operationItem}>
      <Text style={styles.operationIcon}>◉</Text>
      <View style={styles.operationCopy}>
        <Text style={styles.operationTitle}>{title}</Text>
        <Text style={styles.operationDetail}>{detail}</Text>
      </View>
    </View>
  );
}

function CargoCardStatus({ status }: { status: CargoStatus }) {
  const colors = status === 'Pendente'
    ? { backgroundColor: '#38200C', color: '#FFD2A5', borderColor: '#A85400' }
    : status === 'Em andamento'
      ? { backgroundColor: '#FF7900', color: '#1C0B00', borderColor: '#FF7900' }
      : { backgroundColor: '#302B27', color: '#DDD', borderColor: '#514941' };
  return (
    <View style={[styles.tableStatusBadge, colors]}>
      <Text style={[styles.tableStatusText, { color: colors.color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#291C12',
    borderWidth: 1,
    borderColor: '#55341B',
    marginBottom: 14,
  },
  welcomeCopy: {
    gap: 8,
  },
  eyebrow: {
    color: '#FFB36E',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  welcomeTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '800',
  },
  welcomeDescription: {
    color: '#C9B7A7',
    fontSize: 12,
    lineHeight: 18,
  },
  createButton: {
    alignSelf: 'flex-end',
    backgroundColor: palette.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  createButtonText: {
    color: '#1A120A',
    fontSize: 8,
    fontWeight: '800',
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  desktopMetrics: {
    gap: 0,
    marginBottom: 14,
  },
  desktopMetric: {
    width: '24%',
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 8,
    backgroundColor: '#8D3B00',
    borderColor: '#9E4A08',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  metric: {
    width: '48%',
    minHeight: 60,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#9A4300',
    borderColor: '#B85A03',
    borderWidth: 1,
  },
  metricHighlight: {
    borderColor: '#54331B',
  },
  metricValue: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '700',
  },
  metricLabel: {
    color: '#E6E6E3',
    fontSize: 8,
    fontWeight: '700',
    marginTop: 1,
  },
  metricDetail: {
    color: '#F0C9A5',
    fontSize: 6,
    marginTop: 2,
  },
  charts: {
    gap: 13,
  },
  desktopCharts: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  statusPanel: {
    backgroundColor: '#100A04',
    borderColor: '#493018',
    borderWidth: 1,
    borderRadius: 8,
    padding: 9,
    marginBottom: 8,
  },
  desktopChart: {
    flex: 1,
    minHeight: 155,
    marginBottom: 13,
    backgroundColor: '#1A0C00',
  },
  donutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  donut: {
    width: 65,
    height: 65,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 7,
    borderColor: '#FF7700',
    backgroundColor: '#18120B',
  },
  donutAccent: {
    position: 'absolute',
    top: -7,
    left: 22,
    width: 7,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#FFE100',
    transform: [{ rotate: '24deg' }],
  },
  donutCenter: {
    alignItems: 'center',
  },
  donutTotal: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  donutLabel: {
    color: '#A99D92',
    fontSize: 6,
  },
  legend: {
    flex: 1,
    gap: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendMarker: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  legendPending: {
    backgroundColor: '#FFF',
  },
  legendTransit: {
    backgroundColor: '#FFE100',
  },
  legendDone: {
    backgroundColor: '#FAAB00',
  },
  mapPanel: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#332415',
    borderRadius: 8,
    backgroundColor: '#12110E',
    marginBottom: 9,
  },
  mapCanvas: {
    height: 105,
    overflow: 'hidden',
    backgroundColor: '#171711',
  },
  mapGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.015)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  routeLine: {
    position: 'absolute',
    height: 2,
    borderRadius: 2,
    backgroundColor: '#FF8A00',
  },
  routeLineOne: {
    width: '48%',
    top: 55,
    left: '18%',
    transform: [{ rotate: '24deg' }],
  },
  routeLineTwo: {
    width: '37%',
    top: 58,
    left: '53%',
    transform: [{ rotate: '-30deg' }],
    backgroundColor: '#F3C00A',
  },
  mapNodeOne: {
    position: 'absolute',
    top: 29,
    left: '14%',
  },
  mapNodeTwo: {
    position: 'absolute',
    top: 58,
    left: '51%',
  },
  mapNodeThree: {
    position: 'absolute',
    top: 23,
    right: '13%',
  },
  mapNodeText: {
    color: '#FF8A00',
    fontSize: 12,
    textShadowColor: '#FF7900',
    textShadowRadius: 6,
  },
  mapCityOne: {
    position: 'absolute',
    left: '7%',
    top: 12,
    color: '#8D8980',
    fontSize: 6,
  },
  mapCityTwo: {
    position: 'absolute',
    left: '42%',
    bottom: 7,
    color: '#8D8980',
    fontSize: 6,
  },
  mapCityThree: {
    position: 'absolute',
    right: '6%',
    top: 8,
    color: '#8D8980',
    fontSize: 6,
  },
  vehicleSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2117',
  },
  vehicleCount: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  vehicleLabel: {
    color: '#B9AAA0',
    fontSize: 7,
  },
  vehicleRow: {
    minHeight: 29,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#211A12',
  },
  vehicleIcon: {
    color: '#FF7900',
    fontSize: 11,
  },
  vehicleRoute: {
    flex: 1,
  },
  vehicleTitle: {
    color: '#EEE',
    fontSize: 7,
    fontWeight: '700',
  },
  vehicleSubtext: {
    color: '#989087',
    fontSize: 6,
  },
  vehicleStatus: {
    color: '#FF9A2E',
    fontSize: 6,
  },
  statusRow: {
    marginTop: 13,
  },
  barItem: {
    flex: 1,
    justifyContent: 'center',
    gap: 11,
    marginTop: 5,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  statusName: {
    color: '#E6E6E3',
    fontSize: 12,
    fontWeight: '600',
  },
  statusCount: {
    color: palette.secondary,
    fontSize: 11,
  },
  track: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#292B2D',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  pendingProgress: {
    backgroundColor: '#FFAD5C',
  },
  transitProgress: {
    backgroundColor: '#6DAAF5',
  },
  doneProgress: {
    backgroundColor: '#62C789',
  },
  totalLoads: {
    color: '#777A7C',
    fontSize: 10,
    marginTop: 12,
    textAlign: 'right',
  },
  seeAll: {
    color: palette.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  latestSection: {
    minHeight: 120,
    marginBottom: 7,
  },
  latestPanel: {
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: '#100A04',
  },
  tableHeader: {
    minHeight: 36,
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
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.11)',
    paddingHorizontal: 10,
  },
  tableCell: {
    color: '#F4F4F2',
    fontSize: 10,
    paddingRight: 8,
  },
  idColumn: {
    width: '11%',
    color: '#AAA19A',
  },
  cargoColumn: {
    width: '34%',
    fontWeight: '700',
  },
  routeColumn: {
    width: '34%',
  },
  tableStatusColumn: {
    width: '21%',
    alignItems: 'flex-start',
  },
  tableStatusBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  tableStatusText: {
    fontSize: 9,
    fontWeight: '700',
  },
  operationPanel: {
    borderWidth: 1,
    borderColor: '#493018',
    borderRadius: 8,
    backgroundColor: '#100A04',
    padding: 9,
    marginBottom: 4,
  },
  operationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 5,
  },
  operationIcon: {
    color: '#FF8A00',
    fontSize: 11,
  },
  operationCopy: {
    flex: 1,
  },
  operationTitle: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '700',
  },
  operationDetail: {
    color: '#A99D92',
    fontSize: 6,
    marginTop: 2,
  },
});
