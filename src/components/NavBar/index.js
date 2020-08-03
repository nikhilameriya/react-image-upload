import React, { Fragment, Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, Avatar } from '@material-ui/core';
import { LOGO_PATH } from '../../constants';
import './index.css';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoImg: {
    width: '35px',
    height: '35px',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      openMenu: false
    };
  }

  handleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      openMenu: true
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
      openMenu: false
    });
  };

  handleMenuClick = (e, value) => {
    this.setState({
      anchorEl: null,
      openMenu: false
    });

    value.handleClick && value.handleClick(e);
  };

  renderLogo = () => {
    const { classes } = this.props;
    return (
      <Avatar className={classes.logoImg} />
    );
  };

  renderHamburger = () => {
    const { classes } = this.props;
    return (
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
        onClick={this.handleHamburgerClick}>
        <MenuIcon />
      </IconButton>
    );
  };

  handleBackClick = (e) => {
    debugger;
    window.location.replace("/");
  };

  renderNavbarTitle = () => {
    const { classes } = this.props;
    return (
      <Typography variant="h6" className={classes.title}>
        {this.props.title}
      </Typography>
    );
  };

  renderToolbar = () => {
    const { showToolbar, toolbarItems } = this.props;

    if (showToolbar) {
      return (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            <AccountCircle />

          </IconButton>

          {this.renderToolbarItems()}
        </div>
      );
    }
  };

  createToolbarItems = () => {
    let { toolbarItems } = this.props;

    let items;
    items = toolbarItems.loggedOut;

    const html = [];
    if (items) {
      items.forEach((value, index) => {
        html.push(
          <MenuItem key={index} onClick={(e) => this.handleMenuClick(e, value)}>{value.title}</MenuItem>
        );
      });
    }
    return html;
  };

  render() {
    const { classes, showHeader } = this.props;

    if (!showHeader) {
      return (<div />);
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div style={{ display: "contents", cursor: "pointer" }} onClick={this.handleBackClick}>
              {this.renderLogo()}
            </div>
            {this.renderNavbarTitle()}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(useStyles)(NavBar);
