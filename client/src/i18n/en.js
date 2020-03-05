const en = {
  developerName: "Mark Zhu",
  logout: "Log Out",
  profile: "Profile",
  messages: "Messages",
  clickme: "click me :)",
  admin: "admin",
  guest: "guest",
  employer: "employer",
  app: {
    title: "MERN-stack App"
  },
  loginPage: {
    welcome: "Welcome!",
    email: "Email Address",
    password: "Password",

    forgotPassword: "Forgot Password?",
    registerANewOne: "register a new one :)",
    signin: "Sign In",
    noAccount: "Don't have an account? Sign Up"
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
    adminApp: "Admin App"
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
    message: `The graphs use fake data for demonstration purposes only.`,

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
      dashboard: "dashboard",
      developer: "developer",
      useradmin: "useradmin",
      cv: "cv",
      portfolio: "portfolio"
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
    route: "cv",
    message: `This page uses fake data for demonstration purposes only.`
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
