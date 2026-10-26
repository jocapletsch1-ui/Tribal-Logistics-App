import { useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';

import { Screen, palette } from '@/components/Screen';
import { useCargas } from '@/context/CargasContext';
import { categorias } from '@/data/cargas';
import { useIsDesktop } from '@/hooks/use-is-desktop';

export default function NovaCargaScreen() {
  const { adicionarCarga } = useCargas();
  const desktop = useIsDesktop();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [peso, setPeso] = useState('');
  const [valor, setValor] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataColeta, setDataColeta] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [categoriaAberta, setCategoriaAberta] = useState(false);
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');
  const [cadastrada, setCadastrada] = useState(false);

  function cadastrarCarga() {
    const pesoNumerico = Number(peso.replace(',', '.'));
    const valorNumerico = Number(valor.replace(',', '.'));
    const coletaNormalizada = normalizarData(dataColeta.trim());
    const entregaNormalizada = normalizarData(dataEntrega.trim());

    if (!nome.trim() || !categoria || !origem.trim() || !destino.trim() || !coletaNormalizada || !entregaNormalizada) {
      setErro('Preencha os campos obrigatórios com datas válidas no formato AAAA-MM-DD.');
      return;
    }
    if (!Number.isFinite(pesoNumerico) || pesoNumerico <= 0) {
      setErro('Informe um peso válido, maior que zero.');
      return;
    }
    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      setErro('Informe um valor válido, maior que zero.');
      return;
    }

    adicionarCarga({
      nome: nome.trim(),
      categoria,
      peso: pesoNumerico,
      valor: valorNumerico,
      origem: origem.trim(),
      destino: destino.trim(),
      dataColeta: coletaNormalizada,
      dataEntrega: entregaNormalizada,
      observacoes: observacoes.trim(),
    });
    setErro('');
    setCadastrada(true);
    setNome('');
    setCategoria('');
    setPeso('');
    setValor('');
    setOrigem('');
    setDestino('');
    setDataColeta('');
    setDataEntrega('');
    setObservacoes('');
  }

  return (
    <Screen title="Nova carga" subtitle="Cadastre os dados para organizar a próxima coleta.">
      {cadastrada && (
        <View style={styles.successPanel}>
          <Text style={styles.successTitle}>Carga cadastrada com sucesso</Text>
          <Text style={styles.successText}>O novo registro já aparece no painel e na lista de cargas.</Text>
          <Link href="/cargas" asChild>
            <Pressable style={styles.successLink}>
              <Text style={styles.successLinkText}>Ver cargas cadastradas →</Text>
            </Pressable>
          </Link>
        </View>
      )}

      <View style={[styles.formLayout, desktop && styles.desktopFormLayout]}>
        <View style={[styles.formPanel, desktop && styles.desktopFormPanel]}>
          <Text style={styles.panelTitle}>Dados da carga</Text>
          <Text style={styles.requiredHint}>Preencha os campos obrigatórios para registrar sua operação.</Text>

          <View style={styles.desktopFields}>
            <Field
              label="Descrição *"
              value={nome}
              onChangeText={setNome}
              placeholder="Ex.: Carga de milho"
              accessibilityLabel="Descrição da carga"
            />
            <View>
              <Text style={styles.label}>Categoria *</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Selecionar categoria"
                accessibilityState={{ expanded: categoriaAberta }}
                onPress={() => setCategoriaAberta((aberta) => !aberta)}
                style={styles.categorySelect}>
                <Text style={styles.categorySelectText}>{categoria || 'Selecione uma categoria'}</Text>
                <Text style={styles.categoryArrow}>⌄</Text>
              </Pressable>
              {categoriaAberta ? (
                <View style={styles.categoryOptions}>
                  {categorias.map((item) => (
                    <Pressable
                      key={item}
                      accessibilityRole="button"
                      accessibilityState={{ selected: categoria === item }}
                      onPress={() => {
                        setCategoria(item);
                        setCategoriaAberta(false);
                      }}
                      style={styles.categoryOption}>
                      <Text style={styles.categoryOptionText}>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
            <View style={[styles.columns, desktop && styles.desktopColumns]}>
              <View style={styles.column}>
                <Field
                  label="Peso (toneladas) *"
                  value={peso}
                  onChangeText={setPeso}
                  placeholder="Ex.: 18,5"
                  keyboardType="decimal-pad"
                  accessibilityLabel="Peso em toneladas"
                />
              </View>
              <View style={styles.column}>
                <Field
                  label="Valor da carga (R$) *"
                  value={valor}
                  onChangeText={setValor}
                  placeholder="Ex.: 25000"
                  keyboardType="decimal-pad"
                  accessibilityLabel="Valor da carga em reais"
                />
              </View>
            </View>
            <Text style={styles.originHeading}>Origem e destino</Text>
            <View style={[styles.columns, desktop && styles.desktopColumns]}>
              <View style={styles.column}>
                <Field
                  label="Origem *"
                  value={origem}
                  onChangeText={setOrigem}
                  placeholder="Cidade de coleta"
                  accessibilityLabel="Cidade de origem"
                />
              </View>
              <View style={styles.column}>
                <Field
                  label="Destino *"
                  value={destino}
                  onChangeText={setDestino}
                  placeholder="Cidade de entrega"
                  accessibilityLabel="Cidade de destino"
                />
              </View>
            </View>
          </View>

          <Field
            label="Previsão de coleta *"
            value={dataColeta}
            onChangeText={setDataColeta}
            placeholder="27/10/2026, 08:00"
            keyboardType="numbers-and-punctuation"
            maxLength={20}
            calendar
            accessibilityLabel="Previsão de coleta no formato ano, mês e dia"
          />
          <Field
            label="Previsão de entrega *"
            value={dataEntrega}
            onChangeText={setDataEntrega}
            placeholder="27/10/2026, 16:00"
            keyboardType="numbers-and-punctuation"
            maxLength={20}
            calendar
            accessibilityLabel="Previsão de entrega no formato ano, mês e dia"
          />
          <Field
            label="Observações"
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Informações adicionais para a operação"
            multiline
            accessibilityLabel="Observações da carga"
          />

          {erro ? <Text accessibilityRole="alert" style={styles.error}>{erro}</Text> : null}

          <View style={styles.actions}>
            <Link href="/dashboard" asChild>
              <Pressable accessibilityRole="button" style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
            </Link>
            <Pressable
              accessibilityRole="button"
              onPress={cadastrarCarga}
              style={styles.submitButton}>
              <Text style={styles.submitText}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.hintPanel}>
          <Text style={styles.hintTitle}>Antes de cadastrar</Text>
          <Text style={styles.hintIcon}>⬡</Text>
          <Text style={styles.hintText}>
            Confira peso, valor e locais de coleta e entrega. Esses dados ajudam a definir o veículo adequado.
          </Text>
          <Text style={styles.hintSubtext}>
            A carga será registrada como pendente até que um motorista aceite.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  keyboardType,
  multiline = false,
  maxLength,
  calendar = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  maxLength?: number;
  calendar?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={calendar ? styles.inputWithIcon : undefined}>
        <TextInput
          accessibilityLabel={accessibilityLabel}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#747779"
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
          textAlignVertical={multiline ? 'top' : 'center'}
          style={[styles.input, multiline && styles.multilineInput, calendar && styles.dateInput]}
        />
        {calendar ? (
          <View style={styles.calendarIcon}>
            <View style={styles.calendarIconTop} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

function normalizarData(data: string) {
  const iso = /^(\d{4})-(\d{2})-(\d{2})(?:[ T,·]+\s*(\d{2}):(\d{2}))?$/.exec(data);
  const br = /^(\d{2})\/(\d{2})\/(\d{4})(?:,?\s+(\d{2}):(\d{2}))?$/.exec(data);
  const partes = iso ?? br;
  if (!partes) return null;

  const ano = Number(iso ? partes[1] : partes[3]);
  const mes = Number(partes[2]);
  const dia = Number(iso ? partes[3] : partes[1]);
  const hora = Number(partes[4] ?? '0');
  const minuto = Number(partes[5] ?? '0');
  if (hora > 23 || minuto > 59) return null;

  const dataConvertida = new Date(Date.UTC(ano, mes - 1, dia));
  if (
    dataConvertida.getUTCFullYear() !== ano ||
    dataConvertida.getUTCMonth() !== mes - 1 ||
    dataConvertida.getUTCDate() !== dia
  ) return null;

  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  successPanel: {
    borderWidth: 1,
    borderColor: '#2B6841',
    backgroundColor: '#14271B',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
  },
  successTitle: {
    color: '#8DE0A9',
    fontSize: 14,
    fontWeight: '800',
  },
  successText: {
    color: '#C2D8C9',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  successLink: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  successLinkText: {
    color: '#8DE0A9',
    fontSize: 12,
    fontWeight: '700',
  },
  formLayout: {
    gap: 14,
  },
  desktopFormLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 14,
  },
  formPanel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#743600',
    backgroundColor: '#E66A00',
    padding: 10,
    experimental_backgroundImage: 'linear-gradient(100deg, #FF7900 0%, #994700 100%)',
  },
  desktopFormPanel: {
    flex: 2.15,
    minWidth: 0,
    justifyContent: 'space-between',
  },
  hintPanel: {
    flex: 1,
    minHeight: 130,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: '#100A04',
    padding: 11,
  },
  hintTitle: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 9,
  },
  hintIcon: {
    color: palette.accent,
    fontSize: 18,
    marginBottom: 6,
  },
  hintText: {
    color: palette.text,
    fontSize: 8,
    lineHeight: 12,
  },
  hintSubtext: {
    color: '#A99D92',
    fontSize: 8,
    lineHeight: 12,
    marginTop: 10,
  },
  panelTitle: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '800',
  },
  requiredHint: {
    color: '#FFE1C2',
    fontSize: 8,
    marginTop: 3,
    marginBottom: 9,
  },
  field: {
    marginBottom: 9,
  },
  label: {
    color: '#FFF6EC',
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },
  input: {
    minHeight: 29,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(70,29,0,0.68)',
    backgroundColor: 'rgba(85,35,0,0.12)',
    color: palette.text,
    fontSize: 9,
    paddingHorizontal: 8,
  },
  inputWithIcon: {
    position: 'relative',
  },
  dateInput: {
    paddingRight: 27,
  },
  calendarIcon: {
    position: 'absolute',
    right: 8,
    top: 9,
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  calendarIconTop: {
    width: 6,
    height: 2,
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  multilineInput: {
    minHeight: 54,
    paddingVertical: 7,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 16,
  },
  desktopFields: {
    gap: 0,
  },
  originHeading: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 0,
    marginBottom: 5,
  },
  categorySelect: {
    minHeight: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(70,29,0,0.68)',
    borderRadius: 4,
    backgroundColor: 'rgba(85,35,0,0.12)',
    marginBottom: 9,
  },
  categorySelectText: {
    color: '#FFF',
    fontSize: 9,
  },
  categoryArrow: {
    color: '#FFF',
    fontSize: 13,
  },
  categoryOptions: {
    borderWidth: 1,
    borderColor: 'rgba(70,29,0,0.68)',
    borderRadius: 4,
    marginTop: -7,
    marginBottom: 9,
    backgroundColor: '#9E4800',
  },
  categoryOption: {
    minHeight: 27,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(70,29,0,0.25)',
  },
  categoryOptionText: {
    color: '#FFF',
    fontSize: 9,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: '#373A3C',
    backgroundColor: '#191B1D',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  selectedCategory: {
    borderColor: '#9A5927',
    backgroundColor: '#3A2818',
  },
  categoryText: {
    color: '#B4B6B7',
    fontSize: 11,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#FFB36E',
  },
  columns: {
    flexDirection: 'column',
    gap: 0,
  },
  desktopColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flex: 1,
  },
  error: {
    color: '#FF8A80',
    backgroundColor: '#321C1B',
    borderRadius: 9,
    padding: 11,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  submitButton: {
    flex: 1,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7900',
    borderWidth: 1,
    borderColor: '#542500',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  submitText: {
    color: '#1A1007',
    fontSize: 9,
    fontWeight: '800',
  },
  cancelButton: {
    flex: 1,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D3D3D',
    borderRadius: 5,
  },
  cancelText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '600',
  },
});
