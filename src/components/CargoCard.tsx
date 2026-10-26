import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Cargo, CargoStatus } from '@/data/cargas';
import { formatarData } from '@/data/cargas';

const coresStatus: Record<CargoStatus, { color: string; backgroundColor: string }> = {
  Pendente: { color: '#FFD2A5', backgroundColor: '#38200C' },
  'Em andamento': { color: '#1C0B00', backgroundColor: '#FF7900' },
  Concluída: { color: '#DDDDDD', backgroundColor: '#302B27' },
};

export function StatusBadge({ status }: { status: CargoStatus }) {
  return (
    <View style={[styles.badge, { backgroundColor: coresStatus[status].backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: coresStatus[status].color }]} />
      <Text style={[styles.badgeText, { color: coresStatus[status].color }]}>{status}</Text>
    </View>
  );
}

export function CargoCard({ cargo }: { cargo: Cargo }) {
  return (
    <Link href={{ pathname: '/detalhe-carga', params: { cargoId: String(cargo.id) } }} asChild>
      <Pressable accessibilityRole="link" style={styles.card}>
        <View style={styles.cardHeading}>
          <View style={styles.headingText}>
            <Text style={styles.name} numberOfLines={1}>{cargo.nome}</Text>
            <Text style={styles.id}>#{String(cargo.id).padStart(4, '0')} · {cargo.categoria}</Text>
          </View>
          <StatusBadge status={cargo.status} />
        </View>
        <View style={styles.route}>
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, styles.originDot]} />
            <Text style={styles.routeLabel}>ORIGEM</Text>
            <Text style={styles.city} numberOfLines={1}>{cargo.origem}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, styles.destinationDot]} />
            <Text style={styles.routeLabel}>DESTINO</Text>
            <Text style={styles.city} numberOfLines={1}>{cargo.destino}</Text>
          </View>
          <View style={styles.collection}>
            <Text style={styles.routeLabel}>COLETA</Text>
            <Text style={styles.date}>{formatarData(cargo.dataColeta)}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#100A04',
    borderColor: '#493018',
    borderWidth: 1,
    borderRadius: 7,
    padding: 9,
    marginBottom: 7,
  },
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
  },
  headingText: {
    flex: 1,
    gap: 3,
  },
  name: {
    color: '#F4F4F2',
    fontSize: 9,
    fontWeight: '700',
  },
  id: {
    color: '#909294',
    fontSize: 7,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 6,
    fontWeight: '700',
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    gap: 5,
  },
  routePoint: {
    flex: 1,
    gap: 2,
  },
  routeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginBottom: 2,
  },
  originDot: {
    backgroundColor: '#FF8A24',
  },
  destinationDot: {
    backgroundColor: '#7CD6A0',
  },
  routeLabel: {
    color: '#777A7C',
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  city: {
    color: '#ECECEB',
    fontSize: 8,
    fontWeight: '600',
  },
  arrow: {
    color: '#777A7C',
    fontSize: 12,
    marginTop: 4,
  },
  collection: {
    alignItems: 'flex-end',
    gap: 3,
  },
  date: {
    color: '#D7D7D4',
    fontSize: 7,
    fontWeight: '600',
  },
});
