// import React, { useState, Component } from "react";
// import {
//   makeStyles,
//   withStyles,
//   createMuiTheme
// } from "@material-ui/core/styles";
// import {
//   TextField,
//   CssBaseline,
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Paper,
//   FormControl,
//   Grid,
//   Button,
//   Zoom,
//   Slide
// } from "@material-ui/core";
// import { BrowserRouter as Router, NavLink, withRouter } from "react-router-dom";

// import Register from "./register";
// import "../../cssEffects/bouncingEffect.css";
// import { render } from "react-dom";

// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// import { login } from "../../actions/authActions";
// import { clearErrors } from "../../actions/errorActions";
// import compose from "recompose/compose";
// import { Alert } from "@material-ui/lab";
// import Snackbar from "@material-ui/core/Snackbar";
// import TFA from "./tfa";

// import { logLoginSuccess } from "../../actions/adminActions";
// const theme = createMuiTheme({
//   spacing: 4
// });
// const styles = {
//   paper: {
//     marginTop: "25%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: "5%",
//     paddingBottom: "5%",
//     paddingLeft: "15%",
//     paddingRight: "15%"
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.,
//     marginTop: theme.spacing(1),
//     flexDirection: "column"
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   },
//   content: {
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto"
//   },
//   InvencoLogo: {
//     width: "200px",
//     padding: "10px",
//     marginLeft: "20%"
//     // marginRight: "10px",
//     // display: "flex",
//   },
//   topBar: {
//     backgroundColor: "white",
//     justifyContent: "flex-start"
//   }
// };

// const ValidationTextField = withStyles({
//   root: {
//     "& input:valid + fieldset": {
//       // borderColor: "#0084ff",
//       borderWidth: 1
//     },
//     "& input:invalid + fieldset": {
//       borderColor: "red",
//       borderWidth: 1
//     },
//     "& input:valid:focus + fieldset": {
//       borderLeftWidth: 6,
//       borderRightWidth: 6,
//       borderDownWidth: 6,
//       padding: "4px !important", // override inline-style
//       borderColor: "#73A7FF"
//     },
//     appBarSpacer: theme.mixins.toolbar
//   }
// })(TextField);

// /**
//  * The login component.
//  *
//  * @author Mark Zhu <zdy120939259@outlook.com>
//  */
// class Login extends Component {
//   state = {
//     email: "",
//     password: "",
//     msg: null,
//     isLogin: true
//   };
//   /**
//    * function that sets isLogin true.
//    */
//   handleLogin = () => {
//     this.setState({
//       isLogin: true
//     });
//   };

//   /**
//    * function that sets isLogin false.
//    */
//   handleRegister = () => {
//     this.setState({
//       isLogin: false
//     });
//   };

//   callback = (bool, msg) => {
//     this.setState({
//       isLogin: bool,
//       msg: msg
//     });
//   };

//   tfaCallback = () => {
//     this.handleLoginSuccessLog();

//     if (this.props.user.role === "admin") this.props.history.push("/admin");
//     else this.props.history.push("/board");
//   };

//   handleLoginSuccessLog = () => {
//     const { _id, name, email, role, company } = this.props.user;

//     const loginSuccessLog = {
//       name: name,
//       email: email,
//       role: role,
//       explanation: "this user logged in successfully",
//       type: "LOGIN_SUCCESS",
//       company: company
//     };

//     this.props.logLoginSuccess(_id, loginSuccessLog);

//     this.toggle();
//   };
//   static propTypes = {
//     error: PropTypes.object.isRequired,
//     login: PropTypes.func.isRequired,
//     userLoaded: PropTypes.bool,
//     clearErrors: PropTypes.func.isRequired,
//     isTFAing: PropTypes.bool,
//     isAuthenticated: PropTypes.bool,
//     user: PropTypes.object,

//     //withRouter
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
//   };

//   componentDidUpdate(prevProps) {
//     const { error } = this.props;

//     if (error !== prevProps.error) {
//       // Check for register error

//       if (error.id === "LOGIN_FAIL") {
//         this.setState({ msg: error.msg.msg });
//       } else {
//         this.setState({ msg: null });
//       }
//     }
//   }

//   toggle = () => {
//     // Clear errors
//     this.props.clearErrors();
//   };

//   onChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   onSubmit = (e) => {
//     e.preventDefault();

//     const { email, password } = this.state;

//     const user = {
//       email,
//       password
//     };

//     // Attempt to login
//     this.props.login(user);
//     this.toggle();
//   };

//   handleCloseSnackbar = () => {
//     this.setState({
//       msg: null
//     });
//   };

//   render() {
//     const { classes, isTFAing, userLoaded, error, isLoading } = this.props;
//     const { isLogin, msg, email } = this.state;

//     return (
//       <div style={{ backgroundColor: "#E9EAED" }}>
//         <CssBaseline />
//         <AppBar position="relative">
//           <Toolbar className={classes.topBar}>
//             <Slide direction="right" in={true} timeout={500}>
//               {/* <img className={classes.InvencoLogo} src={InvencoLogo} /> */}
//             </Slide>

//             <Typography
//               style={{ color: "black" }}
//               variant="h5"
//               noWrap
//             ></Typography>
//           </Toolbar>
//         </AppBar>

//         {msg ? (
//           <Snackbar
//             // style={{ backgroundColor: "black" }}
//             open={msg !== null}
//             autoHideDuration={3000}
//             onClose={this.handleCloseSnackbar}
//           >
//             <Alert color="error">{msg}</Alert>
//           </Snackbar>
//         ) : null}
//         {userLoaded ? (
//           <TFA email={email} tfaCallback={this.tfaCallback} />
//         ) : (
//           <>
//             <Container maxWidth="sm" className={classes.content}>
//               <Zoom timeout={500} in={true}>
//                 {isLogin ? (
//                   <Paper className={classes.paper}>
//                     <Typography
//                       component="h1"
//                       variant="h5"
//                       style={{
//                         margin: theme.spacing(6, 0, 4)
//                       }}
//                     >
//                       Dev Portal
//                     </Typography>

//                     <form className={classes.form} noValidate>
//                       <FormControl margin="normal" fullWidth>
//                         <ValidationTextField
//                           variant="outlined"
//                           id="email"
//                           label="Email Address"
//                           name="email"
//                           autoComplete="email"
//                           autoFocus
//                           onChange={this.onChange}
//                         />
//                       </FormControl>
//                       <FormControl margin="normal" fullWidth>
//                         <ValidationTextField
//                           variant="outlined"
//                           // margin="normal"
//                           id="password"
//                           label="Password"
//                           name="password"
//                           autoComplete="current-password"
//                           type="password"
//                           onChange={this.onChange}
//                         />
//                       </FormControl>

//                       <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                         onClick={this.onSubmit}
//                       >
//                         Log In
//                       </Button>

//                       <Grid container alignItems="center" justify="center">
//                         <Grid item>
//                           <p
//                             onClick={this.handleRegister}
//                             style={{ fontWeight: "bold" }}
//                           >
//                             admin register?
//                           </p>
//                         </Grid>
//                       </Grid>
//                     </form>
//                   </Paper>
//                 ) : (
//                   <Paper className={classes.paper}>
//                     <Register cb={this.callback} />
//                   </Paper>
//                 )}
//               </Zoom>
//             </Container>
//           </>
//         )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   error: state.error,
//   userLoaded: state.auth.userLoaded,
//   isTFAing: state.auth.isTFAing,
//   isAuthenticated: state.auth.isAuthenticated,
//   user: state.auth.user
// });
// export default compose(
//   withStyles(styles),
//   connect(mapStateToProps, { login, clearErrors, logLoginSuccess })
// )(withRouter(Login));
