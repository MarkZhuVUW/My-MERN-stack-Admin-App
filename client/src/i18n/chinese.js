const chinese = {
  developerName: "朱鑫宇",
  logout: "登出",
  profile: "个人中心",
  messages: "消息",
  clickme: "点我 :)",
  admin: "管理员",
  guest: "游客",
  employer: "老板",
  adminPages: "管理员页面",
  employerGuestPages: "游客老板页面",
  responsiveDialog: {
    skipTFA: "跳过双重认证",
    clickBackdrop: "点击背景关闭对话框",
    submit: "提交",
    cancel: "取消",
    hi: "你好, ",
    logout: "登出",
    loginAsGuest: "以游客登录",
    enterCode: "输入6位数字代码",
  },
  loginPage: {
    welcome: "欢迎光临",
    loginAsDifferentUser: "以不同类型用户登录来看到不同内容(IAM).",

    email: "邮箱",
    password: "密码",
    signInWithGithub: "Github 登录",
    forgotPassword: "忘记密码?",
    registerANewOne: "注册个新的",
    signIn: "登录",
    noAccount: "没有帐号?点击注册",
    mit: "MIT",
    contactDeveloper: "联系我",
    inspiredBy:
      "动画用GreenSock和CSS制作. 灵感来自:  https://revolution.themepunch.com/particle-effect-for-wordpress/ ",
    downloadTFAApp:
      "从应用商店下载Google Authenticator应用. 扫描二维码并输入获得的6位数字",
    chooseRole: "选择以什么身份进入报表页",
    githubOauth: "Github Oauth",
    googleTFA: "Google 双重认证",
    cookie:
      "如您使用本网站并同意本政策，则您同意我们按照本政策条款使用cookies。",
    repoLink: "本项目Github链接",
  },
  registerPage: {
    signUp: "注册",
    name: "名字",
    email: "邮箱",
    password: "密码",
    company: "公司(可选)",

    warning: "登录数据, 浏览数据会被存在我的mongodb数据库",
    goBack: "返回",
  },
  app: {
    title: "MERN-stack 应用",
  },
  frame: {
    menu: "框架",
    adminApp: "管理应用",
    welcome: "欢迎!",
  },
  settings: {
    title: "设置",
    menu: "设置",
    fields: {
      theme: "主题",
    },
  },

  dashboard: {
    menu: "主页",
    route: "主页",
    message: `统计图数据来自我的mongodb database.`,

    table: {
      userActivities: "用户活动",
      name: "名称",
      email: "邮件",
      role: "角色",
      explanation: "解释",
      type: "类型",
      dateLogged: "记录日期",
      company: "公司",
    },
    doughnutChart: {
      title: "登录统计",
      employer: "老板",
      admin: "管理员",
      guest: "游客",
    },
    lineChart: {
      title: "页面浏览统计",
      dashboard: "主页",
      developer: "开发者",
      useradmin: "用户管理",
      welcomePage: "欢迎页",
      cv: "简历",
      portfolio: "档案",
    },
    polarChart: {
      title: "老板活动统计",
    },
  },
  useradmin: {
    menu: "用户管理",
    route: "用户管理",
    message: `本页使用假数据..`,
    userDetail: "用户详情",
    email: "邮箱",
    company: "公司",
    name: "名字",
    role: "角色",
    password: "密码",
    id: "id",
    registerDate: "注册时间",
    createUser: "创建用户",
    table: {
      title: "用户列表",
    },
  },
  developer: {
    menu: "开发者",
    route: "开发者",

    message: `本页使用假数据..`,
  },

  cv: {
    menu: "简历",
    route: "简历",
    message: `本页使用假数据..`,
  },

  welcomePage: {
    menu: "欢迎页",
    route: "欢迎页",
  },
  portfolio: {
    menu: "档案",
    route: "档案",
  },
  errors: {
    401: "请先登录",
    403: "没有访问权限",
    404: "页面不存在",
    500: "服务器爆炸",
  },
  language: {
    language: "中文",
  },
  MuiDataTable: {
    next: "下页",
    previous: "上页",

    rowsPerPage: "每页行数",
    displayRows: "总共",
    viewColumns: "看列",
    search: "搜索",
    downloadCsv: "下载CSV",
    print: "打印",
    filterTable: "过滤表格",
    filterTitle: "过滤",
    reset: "reset",
    viewColumnsTitle: "看列",
    selectedRowsText: "行已选中",
    delete: "删除",
  },
};

export default chinese;
