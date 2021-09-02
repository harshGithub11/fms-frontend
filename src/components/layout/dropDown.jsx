import { FormControl, FormHelperText, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import React, { Component } from 'react';

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 175,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class DropDown extends Component {

    render() {

        //Que: Should i initialize it in constructor or here only?
        const {menuItems, classes} = this.props;
    
        return (
            <div>
                <FormControl className={classes.formControl} error={this.props.error}>
                    <InputLabel>{this.props.label}</InputLabel>
                    <Select
                        name={this.props.name}
                        onChange={this.props.handleChange}
                        value={this.props.value}
                    >
                        {
                            menuItems.map(menuItem => {
                                return <MenuItem key={menuItem.airportCode} value={menuItem.airportLocation}>{menuItem.airportLocation}</MenuItem>
                            })
                        }
                    </Select>
                    <FormHelperText>{this.props.helperText}</FormHelperText>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(DropDown);