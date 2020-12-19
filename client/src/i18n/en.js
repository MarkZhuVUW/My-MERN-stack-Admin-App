const en = {
  developerName: "Mark Zhu",
  logout: "Log Out",
  profile: "Profile",
  messages: "Messages",
  clickme: "click me :)",
  admin: "admin",
  guest: "guest",
  employer: "employer",
  adminPages: "Admin Pages",
  employerGuestPages: "Employer&Guest Pages",
  app: {
    title: "MERN-stack App"
  },
  responsiveDialog: {
    skipTFA: "skip TFA",
    clickBackdrop: "Please click on the backdrop to close this dialog",
    submit: "submit",
    cancel: "cancel",
    hi: "Hi, ",
    logout: "logout",
    loginAsGuest: "Login as guest",
    enterCode: "enter code"
  },
  loginPage: {
    welcome: "Welcome!",
    loginAsDifferentUser:
      "Login as different user to see IAM." +
      " (guest currently sees the same content as employer)",
    email: "Email Address",
    password: "Password",
    signInWithGithub: "Sign In With Github",
    forgotPassword: "Forgot Password?",
    registerANewOne: "register a new one :)",
    signIn: "Sign In",
    noAccount: "Don't have an account? Sign Up",
    mit: "MIT",
    contactDeveloper: "Contact The Developer",
    inspiredBy:
      "Animations are made with GreenSock and CSS. " +
      "inspired by: https://revolution.themepunch.com/particle-effect-for-wordpress/",
    downloadTFAApp:
      "Download google authenticator app from any app store," +
      " scan the QRCode, enter the code to continue or skip",
    tfaExists:
      "Enter the code on the google authenticator app to continue or skip",
    chooseRole: "Choose a role to enter dashboard",
    githubOauth: "Github Oauth",
    googleTFA: "Google Two-Factor Auth",
    cookie:
      "This website uses cookie, by continuing " +
      "to browse you agree to our use of cookies",
    repoLink: "Github Repo",
    licenseText:
      "This website is MIT licensed. https://opensource.org/licenses/MIT"
  },
  registerPage: {
    signUp: "Sign Up",
    name: "Name",
    email: "Email Address",
    password: "Password",

    company: "company(optional)",
    warning:
      "page views, downloads, login info will be stored in my mongodb database",
    goBack: "go back"
  },
  frame: {
    menu: "frame",
    adminApp: "Admin App",
    welcome: "Welcome!"
  },
  settings: {
    title: "Settings",
    menu: "Settings",
    route: "settings",

    fields: {
      theme: "Theme"
    }
  },
  dashboard: {
    menu: "Home",
    route: "dashboard",
    message: `This page uses data from my mongodb database`,

    table: {
      userActivities: "User Activities",
      name: "name",
      email: "email",
      role: "role",
      explanation: "explanation",
      type: "type",
      dateLogged: "date logged",
      company: "company"
    },
    doughnutChart: {
      title: "Login Statistics",
      employer: "employer",
      admin: "admin",
      guest: "guest"
    },
    lineChart: {
      title: "Page Views and Downloads",
      dashboard: "Dashboard",
      developer: "Developer",
      useradmin: "UserAdmin",
      welcomePage: "Welcome Page",
      cv: "CV",
      portfolio: "Portfolio"
    },
    polarChart: {
      title: "Employer Action Statistics"
    }
  },
  useradmin: {
    menu: "UserAdmin",
    route: "useradmin",
    message: `This page uses data from my mongodb database`,
    userDetail: "User Detail",
    email: "email",
    company: "company",
    name: "name",
    role: "role",
    password: "password",
    createUser: "Create User",
    id: "id",
    registerDate: "register Date",
    table: {
      title: "User List"
    }
  },

  developer: {
    menu: "Developer",
    route: "developer",
    message: `This page uses fake data for demonstration purposes only.`
  },
  cv: {
    menu: "CV",
    route: "cv"
  },

  welcomePage: {
    menu: "Welcome Page",
    route: "welcomepage"
  },
  portfolio: {
    menu: "Portfolio",
    route: "portfolio",
    numOfPublicRepos: "Number of Public repos",
    githubUsername: "Github Username",
    hireable: "Hireable",
    followers: "Followers",
    star: "Star",
    unstar: "Unstar"
  },

  errors: {
    401: "Please login first",
    403: "Do not have to access to this page",
    404: "Page Not Found",
    500: "Internal Error",
    forbidden: {
      message: "Forbidden"
    },
    validation: {
      message: "An error occurred"
    }
  },
  language: {
    language: "English"
  },
  MuiDataTable: {
    next: "next page",
    previous: "previous page",

    rowsPerPage: "rows per page: ",
    displayRows: "of",
    viewColumns: "view columns",
    search: "search",
    downloadCsv: "download CSV",
    print: "print",
    filterTable: "filter table",
    filterTitle: "filters",
    reset: "reset",
    viewColumnsTitle: "show columns",
    selectedRowsText: "rows(s) selected",
    delete: "delete"
  }
};

export default en;
