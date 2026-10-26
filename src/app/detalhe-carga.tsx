import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen, SectionHeading, palette } from '@/components/Screen';
import { StatusBadge } from '@/components/CargoCard';
import { useCargas } from '@/context/CargasContext';
import { formatarData, formatarMoeda } from '@/data/cargas';

export default function DetalheCargaScreen() {
  const { cargoId } = useLocalSearchParams<{ cargoId: string }>();
  const { cargas } = useCargas();
  const carga = cargas.find((item) => item.id === Number(cargoId));

  if (!carga) {
    return (
      <Screen title="Carga não encontrada" subtitle="Não foi possível localizar esse registro.">
        <Link href="/cargas" asChild>
          <Pressable style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar para a lista</Text>
          </Pressable>
        </Link>
      </Screen>
    );
  }

  return (
    <Screen title="Detalhes da carga" subtitle={`Acompanhe o registro #${String(carga.id).padStart(4, '0')}.`}>
      <View style={styles.hero}>
        <View style={styles.heroTitleRow}>
          <View style={styles.heroText}>
            <Text style={styles.category}>{carga.categoria.toLocaleUpperCase('pt-BR')}</Text>
            <Text style={styles.name}>{carga.nome}</Text>
          </View>
          <StatusBadge status={carga.status} />
        </View>
        <Text style={styles.registered}>Solicitação #{String(carga.id + 1022)}</Text>
      </View>

      <View style={styles.routePanel}>
        <SectionHeading title="Rota da carga" />
        <View style={styles.route}>
          <RoutePoint label="ORIGEM" city={carga.origem} />
          <Text style={styles.arrow}>→</Text>
          <RoutePoint label="DESTINO" city={carga.destino} />
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.detailLabel}>Data de coleta</Text>
          <Text style={styles.detailValue}>{formatarData(carga.dataColeta)}</Text>
        </View>
        {carga.dataEntrega ? (
          <View style={styles.dateRow}>
            <Text style={styles.detailLabel}>Previsão de entrega</Text>
            <Text style={styles.detailValue}>{formatarData(carga.dataEntrega)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.detailsPanel}>
        <SectionHeading title="Informações da carga" />
        <Detail label="Peso" value={`${carga.peso} toneladas`} />
        <Detail label="Valor estimado" value={formatarMoeda(carga.valor)} />
        <Detail label="Categoria" value={carga.categoria} />
      </View>

      <View style={styles.statusPanel}>
        <Text style={styles.statusHeading}>Acompanhamento</Text>
        <View style={styles.timelineRow}>
          <View style={styles.timelineDot} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Solicitação registrada</Text>
            <Text style={styles.timelineText}>A carga foi adicionada à operação.</Text>
          </View>
        </View>
        <View style={styles.timelineRow}>
          <View style={[styles.timelineDot, carga.status === 'Pendente' && styles.inactiveDot]} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>
              {carga.status === 'Pendente' ? 'Aguardando aceite' : 'Transporte atualizado'}
            </Text>
            <Text style={styles.timelineText}>
              {carga.status === 'Pendente'
                ? 'A solicitação aguarda a confirmação do transporte.'
                : `Status atual: ${carga.status}.`}
            </Text>
          </View>
        </View>
        {carga.observacoes ? (
          <View style={styles.observations}>
            <Text style={styles.detailLabel}>Observações</Text>
            <Text style={styles.detailValue}>{carga.observacoes}</Text>
          </View>
        ) : null}
      </View>

      <Link href="/solicitacoes" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Ver minhas solicitações</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

function RoutePoint({ label, city }: { label: string; city: string }) {
  return (
    <View style={styles.routePoint}>
      <View style={styles.routeDot} />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.city}>{city}</Text>
    </View>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#743600',
    backgroundColor: '#A94B00',
    padding: 17,
    experimental_backgroundImage: 'linear-gradient(100deg, #FF7900 0%, #713000 100%)',
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroText: {
    flex: 1,
    gap: 5,
  },
  category: {
    color: '#FFE2C7',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  registered: {
    color: '#F5D6BC',
    fontSize: 11,
    marginTop: 13,
  },
  routePanel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2612',
    backgroundColor: '#100A04',
    padding: 16,
    marginTop: 13,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 12,
  },
  routePoint: {
    flex: 1,
    gap: 6,
  },
  routeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: palette.accent,
  },
  arrow: {
    color: '#94887E',
    fontSize: 20,
  },
  city: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  dateRow: {
    borderTopWidth: 1,
    borderTopColor: '#342315',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsPanel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2612',
    backgroundColor: '#100A04',
    padding: 16,
    marginTop: 13,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#2D2117',
  },
  detailLabel: {
    color: '#B9AAA0',
    fontSize: 11,
  },
  detailValue: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  statusPanel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2612',
    backgroundColor: '#100A04',
    padding: 16,
    marginTop: 13,
  },
  statusHeading: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    marginBottom: 14,
  },
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FF7900',
    marginTop: 3,
  },
  inactiveDot: {
    backgroundColor: '#564638',
  },
  timelineContent: {
    flex: 1,
    gap: 4,
  },
  timelineTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  timelineText: {
    color: '#B9AAA0',
    fontSize: 11,
    lineHeight: 16,
  },
  observations: {
    borderTopWidth: 1,
    borderTopColor: '#2D2117',
    paddingTop: 11,
    gap: 6,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF7900',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 11,
    marginTop: 14,
  },
  backButtonText: {
    color: '#1B1006',
    fontSize: 12,
    fontWeight: '800',
  },
});
