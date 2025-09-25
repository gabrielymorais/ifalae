import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

/* ======== Tema novo: clean/light ======== */
const COLORS = {
  bg: '#F5F7FA',        // fundo claro
  surface: '#FFFFFF',   // cards
  soft: '#F1F3F5',      // inputs / áreas suaves
  primary: '#33C37E',   // verde IFCE
  text: '#111827',      // título
  sub: '#6B7280',       // subtítulo
  line: '#E5E7EB',      // linhas/bordas
  chipBg: '#E9FBF2',    // fundo do chip
  chipTx: '#0E7A56',    // texto do chip
};

const AVATARS = Array.from({ length: 8 }).map((_, i) =>
  `https://i.pravatar.cc/150?img=${i + 5}`
);

const stories = AVATARS.map((url, i) => ({
  id: `s-${i}`,
  name: i === 0 ? 'carolis…' : `user_${i}`,
  avatar: url,
}));

type Post = {
  id: string;
  author: { name: string; avatar: string };
  time: string;
  text: string;
  image: string | ImageSourcePropType;
  likes: number;
  comments: number;
  tag?: string; // chip opcional
};

/* Use require(...) p/ locais e URL p/ remotas */
const posts: Post[] = [
  {
    id: 'p-1',
    author: { name: 'Universo IFCE', avatar: AVATARS[2] },
    time: 'há 3 minutos',
    text:
      'Segue programação oficial ilustrativa do nosso evento Universo IFCE que acontecerá durante a semana de SETEMBRO.',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    likes: 128,
    comments: 42,
    tag: 'Evento',
  },
  {
    id: 'p-2',
    author: { name: 'NAPNE', avatar: AVATARS[5] },
    time: 'há 3 minutos',
    text:
      'Segue programação oficial ilustrativa do nosso evento NAPNE que acontecerá durante a semana de NOVEMBRO.',
    image: require('../../assets/images/napne.jpg'),
    likes: 86,
    comments: 19,
    tag: 'Inclusão',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>IFALAÊ</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="bell" size={22} color={COLORS.sub} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stories */}
          <View style={styles.storiesWrap}>
            <FlatList
              data={stories}
              keyExtractor={(i) => i.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => <StoryBubble {...item} />}
            />
          </View>

          {/* Composer */}
          <View style={styles.composer}>
            <Image source={{ uri: stories[0].avatar }} style={styles.avatarSm} />
            <TextInput
              placeholder="O que você está pensando…?"
              placeholderTextColor={COLORS.sub}
              style={styles.input}
            />
            <TouchableOpacity>
              <Feather name="more-horizontal" size={22} color={COLORS.sub} />
            </TouchableOpacity>
          </View>

          {/* Feed */}
          <View style={{ padding: 16, gap: 14 }}>
            {posts.map((p) => (
              <PostCard key={p.id} {...p} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ======== Components ======== */
const StoryBubble = ({ avatar }: { avatar: string; name: string }) => (
  <View style={styles.story}>
    <View style={styles.storyRing}>
      <Image source={{ uri: avatar }} style={styles.storyImg} resizeMode="cover" />
    </View>
  </View>
);

const PostCard = ({ author, time, text, image, likes, comments, tag }: Post) => {
  const src = typeof image === 'string' ? { uri: image } : image;

  return (
    <View style={styles.post}>
      {/* Topo */}
      <View style={styles.postHeader}>
        <Image source={{ uri: author.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.author}>{author.name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Feather name="more-vertical" size={20} color={COLORS.sub} />
      </View>

      {/* Imagem */}
      <Image source={src} style={styles.bannerImg} />

      {/* Meta / ações */}
      <View style={styles.metaRow}>
        {tag ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{tag}</Text>
          </View>
        ) : <View />}

        <View style={styles.actionsLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={22} color={COLORS.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="chatbubble-outline" size={22} color={COLORS.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="paper-plane-outline" size={22} color={COLORS.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { marginLeft: 4 }]}>
            <MaterialCommunityIcons name="bookmark-outline" size={22} color={COLORS.sub} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Texto */}
      <Text style={styles.postText}>{text}</Text>

      {/* Contagens (discretas) */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{likes} curtidas</Text>
        <Text style={styles.dot}>·</Text>
        <Text style={styles.countText}>{comments} comentários</Text>
      </View>
    </View>
  );
};

/* ======== Styles ======== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: COLORS.text,
    opacity: 0.9,
  },
  headerBtn: { padding: 6, borderRadius: 10 },

  storiesWrap: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
  },
  story: { marginRight: 12 },
  storyRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: `${COLORS.primary}55`, // aro suave
  },
  storyImg: { width: 56, height: 56, borderRadius: 28 },

  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarSm: { width: 28, height: 28, borderRadius: 14 },
  input: {
    flex: 1,
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line,
    color: COLORS.text,
    fontSize: 14,
  },

  post: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    overflow: 'hidden',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
    }),
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  author: { color: COLORS.text, fontWeight: '700' },
  time: { color: COLORS.sub, fontSize: 12 },

  bannerImg: {
    width: '100%',
    height: Math.round((width - 32) * 0.58),
  },

  metaRow: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  chip: {
    backgroundColor: COLORS.chipBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFF1DD',
  },
  chipText: { color: COLORS.chipTx, fontSize: 12, fontWeight: '600' },

  actionsLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 6 },

  postText: {
    color: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    lineHeight: 20,
  },

  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 6,
  },
  countText: { color: COLORS.sub, fontSize: 12 },
  dot: { color: COLORS.sub, fontSize: 12, marginTop: -1 },
});
