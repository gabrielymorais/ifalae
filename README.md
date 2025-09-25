# IFalaê — App (Expo + React Native)

![IFalaê — Home](./assets/readme/home.png)

> Feed social do IFCE, feito com Expo + React Native. Esta é a tela principal com Stories, Composer e Feed.

<p align="center">
  <a href="https://expo.dev/"><img alt="Expo" src="https://img.shields.io/badge/Expo-51+-000?logo=expo&logoColor=white"></a>
  <a href="https://reactnative.dev/"><img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.75+-61DAFB?logo=react&logoColor=000"></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white">
  <img alt="Platform" src="https://img.shields.io/badge/Android%20%7C%20iOS-Mobile-34C759">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-000">
</p>

---

## ✨ Destaques

* **UI moderna e leve** (cards claros, sombras suaves, chips)
* **Stories** com imagens remotas (Pravatar/RandomUser ou sua API)
* **Composer** (“O que você está pensando…?”)
* **Feed** com imagens locais *ou* remotas
* **Bottom bar custom** (Home, Buscar, Criar, Perfil)
* Estruturado com **Expo Router**

## 🗂️ Estrutura

```
app/
  _layout.tsx            # Stack root
  (tabs)/
    _layout.tsx          # Tabs com bottom bar custom
    index.tsx            # Home (Stories + Feed)
    explore.tsx          # Buscar
    profile.tsx          # Perfil
assets/
  images/                # Imagens do feed
  stories/               # Avatares dos stories (se usar local)
  readme/
    home.png             # Screenshot usado no README ← coloque aqui
```

## 🚀 Começando

```bash
# 1) instalar dependências
npm i

# 2) iniciar
npx expo start
```

Abra no **Expo Go** (Android/iOS) ou emulador.



## 🤝 Contribuindo

Pull requests são muito bem-vindos. Padrão de commits sugerido: **conventional commits**.

## 📝 Licença

MIT © 2025 IFalaê
