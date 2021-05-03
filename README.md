## React practice project

#### TODO list

[x] React component
[x] React redux connect syntax
[x] React Hook
[x] React router
[ ] Integrate axios with react
[ ] Best practice


## React学习笔记

最近新入职了阿里巴巴的一个部门，结果这个部门所有的项目都是使用react开发的，对于我这样一个写了4年Vue的人来说真是。。。崩溃的。特别是我已经29岁高龄，从头开始学习一个框架真是一言难尽。

> 本文的实践代码都在 https://github.com/LeiSe7en/react-demo

#### 脚手架 react-create-app

这个脚手架是开箱即用的模式，那么他做了什么呢？

这个脚手架做了如下内容：

* React, JSX, ES6, and Flow syntax support.
* Language extras beyond ES6 like the object spread operator.
* Autoprefixed CSS, so you don’t need -webkit- or other prefixes.
* A fast interactive unit test runner with built-in support for coverage reporting.
* A live development server that warns about common mistakes.
* A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
* An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.
* Hassle-free updates for the above tools with a single dependency.

在这个脚手架生成的项目的`package.json`中有一个神奇的东西：`react-script`

这个东西是干嘛用的，为什么每个脚本都要用它来执行呢？

#### react-script揭秘

react-script也是一个依赖包，存在于`node_modules`文件夹中。在package.json中scripts代码如下：

```JS
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

每一个脚本都是使用react-script来执行。react-script的源码在 _/bin/react-scripts.js_. 这个脚本接收一个参数，这个参数必须是 `start, build, test, and eject`其中之一才行，否则就会报错。粗看了一下这个脚本的源码发现，在项目中找不到的`webpack`相关的配置其实都在这个依赖中隐藏好了.

下面以start脚本为例，看看这个过程是怎么样的：

运行`npm start`的时候，会执行`/scripts`文件夹中的start脚本，start脚本的工作：

* 将执行环境设置为development，这个环境会被webpack以及babel读取
* 确保编译过程能读取到环境变量
* 检查这个项目安装的依赖是否还可用
* 检查你是否使用了typescript
* 引入这个项目必需的依赖，大多数是webpack相关的
* 检查端口是否可用，默认就是3000端口
* 执行编译器，并且获取webpack抛出的信息。webpack会执行babel eslint等工具
* 等到webpack开始执行了，就会打开一个浏览器窗口，并且运行webpack-devserver，监听你的文件修改


> [create-react-app-npm-scripts-explained](https://www.freecodecamp.org/news/create-react-app-npm-scripts-explained/)


#### 使用脚手架生成的项目如何配置webpack呢？

使用脚手架生成项目固然很方便，但是webpack的配置都隐藏起来了，我们熟悉的`webpack.config.json`不见了，如果想要定制`webpack`咋办呢?

我们可以使用`react-app-rewired`. 在我接手的第一个项目，我就看到了这个玩意，当时很懵逼，不知道这是干嘛的。

> [change webpack config create react app without ejecting](https://jaketrent.com/post/change-webpack-config-create-react-app-without-ejecting)

安装好这个依赖之后，我们需要创建一个 特殊命名的文件：`config-overrides.js`，并且把它放在根目录（我是觉得这个文件名和路径应该是可以配置的，我再去查查）。

这个文件要导出一个方法，这个方法接收已经存在的webpack配置，还有env。

```JS
module.exports = (config, env) => {
  config.module.rules.push(
    {
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
          }
        }
      ],
      include: path.resolve('src')
    }
  )
  return config
}
```

完成配置之后，还需要在`package.json`中将原有的使用`react-script`执行的脚本替换为使用`react-app-rewired`执行.

```JS
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom"
  }
}
```

#### 探寻React框架的运行机制

主要是为了解决一些好奇：

1. 父子组件谁先调用`componentDidMount`
2. 是否每次调用`setState`都会调用一遍`render`函数

对于第一的问题，做了一个简单的实践，发现是子组件先完成mount然后才是父组件。

第二个问题，在`class component`每次调用`setState`都会调用一遍`render`，即便你的next和previous的值相同，也会调用。但是这里`class component`和`function component`有个区别，对于`function component`调用`setState`相同的value不会导致rerender但是`class component`却会。

> [ReactJS -- If it is setting a state with the same value, will the component be re-rendered?](https://dev.to/sunflower/reactjs-if-it-is-setting-a-state-with-the-same-value-will-the-component-be-re-rendered-5g24)

由上面的一些好奇引申出的问题：

1. 如果父组件更新了一个 _与子组件无关的状态_ 子组件会不会rerender？

   答案是会的，即便这个状态我只是在父组件中使用，我更新这个状态也会导致子组件rerender。所以我们需要`pureComponent`

2. 为了减少组件rerender的次数，从而能提高性能，我们可以使用`React.memo`


> * `PureComponent`: prevents unnecessary re-rendering of class components
> * `React.memo()`: prevents unnecessary re-rendering of function components

`React.memo`与那个`useMemo`不是一种东西。React.memo是一个高阶组件，会返回一个被包裹之后的组件，被包裹的组件会 **对props进行浅比较**，如果props没有改变被包裹的组件就不会重新渲染.  `React.memo`只会比较props，如果被包裹的组件里面有用到自己的状态，那么自己组件的状态改变的时候还是触发rerender。

目前对于React.memo的理解就是避免不必要的rerender。比如子组件只是展示从父组件传进来的一些信息，这些信息如果不改变的时候，就不需要重新渲染子组件了。因为正常情况下，父组件的rerender会导致子组件一起rerender

> [Use react memo wisely](https://dmitripavlutin.com/use-react-memo-wisely/)

说了这么多关于 “纯组件” 的东西，那么什么叫 “纯组件” 呢？

从函数式编程的层面看，所谓的“纯”指如果一个方法满足如下两个条件，我们就称它为纯函数：

* **这个函数的返回值只由他的输入决定**
* **这个函数对于相同的输入，永远返回相同的值**

那么react中的纯组件，值得就是如果对于相同的state和props，总是渲染相同的内容。

React中的`PureComponen`内部实际上是实现了一个`shouldComponentUpdate()`方法，在这个方法中会对props和state进行浅比较。


> [how does a react pure component work](https://blog.logrocket.com/react-pure-components-functional/#howdoesareactpurecomponentwork)

那么React中的浅比较是啥意思呢？

在JS中所谓的浅比较分为如下两种情况：

1. 当比较简单类型的值的时候（比如string，number）会直接比较他们的值
2. 当比较对象等一些引用类型的时候，会比较他们的引用是否为同一个，即他们是否指向同一个对象

在React中shallowCompare()这个方法是如何做的呢？根据源码来看，大体是这样的

在做浅比较的时候，会遍历传入的对象的所有的key，找到这个key的value，然后对这个value进行浅比较



#### React hook 学习

一个很好的视频：[10 React Hooks Explained // Plus Build your own from Scratch](https://www.youtube.com/watch?v=TNhaISOUy6Q)

##### 1. useState

这个hook的目的就是帮助react管理状态。当状态改变的时候，会重新渲染UI

##### 2. useEffect

在`class component`中，由于继承了react提供的一些基础组件，我们可以使用很多的生命周期函数，例如`componentDidMount`，但是在`functional component`中我们如果我们需要在这个组件完成挂载之后执行一些`side-effect`，就需要用到这个hook了

这个hook接收两个参数，一个是需要执行的`callback`，一个是控制执行时机的。在`useEffect`hook中传入的callback如果返回一个函数，那么在这个组件被移除的时候，会执行这个返回的函数。

> [react useeffect explanation](https://dmitripavlutin.com/react-useeffect-explanation/)

##### 3. useRef

这个hook会生成一个引用。这个引用最常用的是获取native html元素。比如说我想programmatically调用一个button的click方法：

```JS
  function App () {
    const myBtn = useRef(null)

    // 可以在逻辑中通过programmatical的方式调用。
    const clickIt = () => {
      myBtn.current.click()
    }

    return (
      <div>
        <button ref={myBtn}></button>
      </div>
    )
  }

```

##### 4. useReduce

这个hook。。。。就是为了操作redux。 就像useState，他也会返回两个值，一个是当前的state，另一个是dispatch。dispatch可以分发一个action去修改state。

举个🌰吧：

```JS

function reducer (state, action) {
  switch (action.type) {
    // do sth...
    case 'increment':
      return state + 1;

    default: 
      throw new Error(); 
  }
}


function App () {

  // 传入需要的reducer以及默认值
  const [ state, dispatch ] = useReducer(reducer, 0)
  return (
    <>
      count: {state}
      <button onClick={() => dispacth({type: 'increment'})}></button>
    </>
  )
}
```

##### 4. useMemo

避免在每次重新渲染的时候，进行复杂的重复的没有变化的计算。

##### 5. useCallback

> useCallback(callback, [dependices])

上面的`useMemo`是为了记住计算出来的值，那么我们如果想要记住一个方法怎么办？就需要这个hook了.

使用场景是什么呢？比如我们的父组件有一个方法，这个方法可能会计算并且生成一个很长很长的列表，然后我们有很多子组件通过props传递的方式调用这个方法，那么每个子组件都会调用一遍并且计算一遍。这时我们就可以使用这个“记忆方法”，防止每次都重新调用并且在方法中进行复杂的计算。







