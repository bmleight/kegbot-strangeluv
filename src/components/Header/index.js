const React = require('react');
const AppBar = require('material-ui/AppBar').default;
const IconButton = require('material-ui/IconButton').default;
const IconMenu = require('material-ui/IconMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const FlatButton = require('material-ui/FlatButton').default;
const Toggle = require('material-ui/Toggle').default;
const MenuIcon = require('material-ui/svg-icons/navigation/menu').default;
const FaceIcon = require('material-ui/svg-icons/action/face').default;
const VisibilityIcon = require('material-ui/svg-icons/action/visibility').default;
const NavigationClose = require('material-ui/svg-icons/navigation/close').default;

class Header extends React.Component {

    static propTypes = {
        toggleFaceDetection: React.PropTypes.func.isRequired,
        isFaceDetectionRunning: React.PropTypes.bool.isRequired
    }

    render() {

        return (

            <AppBar
                title="Kegbot"
                iconElementLeft={
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MenuIcon color='white' /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText='Face Detection' onClick={this.props.toggleFaceDetection}/>
                    </IconMenu>
                }
                iconElementRight={
                    <div>
                        {this.props.isFaceDetectionRunning &&
                            <IconButton><VisibilityIcon color='white' /></IconButton>
                        }
                        {this.props.face &&
                            <IconButton><FaceIcon color='white' /></IconButton>
                        }
                    </div>
                }
            />
        );

    }
}

module.exports = Header;
