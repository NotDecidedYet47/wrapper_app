# Wrapper App

## 개요

주로 인증 기능과 앱 구동만을 담당하는 Native 앱입니다.

이 앱은 기본적으로 두 가지 역할을 수행합니다:

1.	인증(Authentication) 기능: 사용자 인증 및 권한 부여와 같은 보안 관련 기능을 수행합니다.
2.	웹 컨텐츠 제공(WebView): 주요 기능과 컨텐츠는 React 기반 웹 앱을 통해 제공하며, 이를 표시하기 위해 WebView를 사용합니다.

## 시작 가이드

### Requirements

- [Node.js v18.18.2](https://nodejs.org/ca/blog/release/v18.18.2/)
- [Npm 9.8.1](https://www.npmjs.com/package/npm/v/9.8.1)

### Installation

``` bash
$ nvm use v.18.18.2
$ npm install
```

#### expo start

```bash
$ npm start # expo
$ npm android # android
$ npm ios # ios
$ npm web # web
```

## Stack

- Typescript
- React Native
- Expo
- NativeWind(TailwindCSS)