import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox';
import blue from 'material-ui/colors/blue';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import SaveIcon from 'material-ui-icons/Save';
import RefreshIcon from 'material-ui-icons/Refresh';
import Divider from 'material-ui/Divider'
import classNames from 'classnames';

import NumberFormat from 'react-number-format'
import axios from 'axios'

function NumberFormatCustom(props) {
  return (
    <NumberFormat
      {...props}
      onValueChange={(values) => {
        props.onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  )
}
NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  checked: {
    color: blue[400]
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
});

class _Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        ...props.settings
      },
      saveButton: {
        loading: false,
        success: false,
      }
    }
  }

  handleTextChange = (name,setting) => event => {
    this.setState({
      saveButton: {
        success: false,
        loading: false,
      }
    })

    var value = event.target.value
    const settings = {...this.state.settings}

    if (name !== 'reverse' && value.charAt(0) !== '-' && value !== 'NaN') {
      value = value.length > 0 ? parseInt(value) : ''
      if (value.length > 0 && name === 'minOutput' && value < 0) {
        this.setState({ settings: {...settings, [setting]: {...settings[setting], [name]: 0} } })
      } else if (value.length > 0 && name === 'maxOutput' && value > 100) {
        this.setState({ settings: {...settings, [setting]: {...settings[setting], [name]: 100} } })
      } else {
        this.setState({ settings: {...settings, [setting]: {...settings[setting], [name]: value} } })
      }
    }

    if (name === 'reverse') {
      this.setState({ settings: {...settings, [setting]: {...settings[setting], [name]: value === 'true' ? false : true} } })
    }
  }

  handleUnfocus = (name, setting) => event => {
    const settings = {...this.state.settings}
    if (event.target.value == '') {
      this.setState({ settings: {...settings, [setting]: {...settings[setting], [name]: this.props.settings[setting][name]} } })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.settings != this.props.setting) {
      this.setState({
        saveButton: {
          loading: false,
          success: true,
        }
      })
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer)
  }

  handleSaveButtonClick = () => {
    if (!this.state.saveButton.loading) {
      this.setState({
        saveButton: {
          success: false,
          loading: true,
        }
      },() => {
        this.timer = setTimeout(() => {
          this.setState({
            saveButton: {
              success: false,
              loading: false,
            }
          });
        }, 5000);
      })
      axios.post('https://reicherthome.duckdns.org/api/settings', this.state.settings).catch(err => {
        console.log('Whoops, that didnt work (settings)')
        console.log(err);
      })
    }
  }

  handleRefreshButtonClick = () => {
    this.setState({
      settings: this.props.settings
    })
  }

  timer = undefined

  render() {
    const { classes } = this.props
    const { settings } = this.state
    const { loading, success } = this.state.saveButton
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    })
    return (
      <div style={{marginBottom:'30px'}}>
        <div className='row'>
          <div className='col-12' style={{marginTop:'20px'}}>
            <Card style={{maxWidth:'600px',margin:'0 auto'}}>
              <CardContent>
                <Typography type='display1' component='h2' align='left'>
                  PID Parameters
                </Typography>
                <Divider light style={{marginTop:'10px'}}/>
                <FormControl margin='normal' style={{width:'31%'}}>
                  <InputLabel htmlFor="name-simple">P</InputLabel>
                  <Input
                    value={settings.pid.P}
                    onChange={this.handleTextChange('P', 'pid')}
                    onBlur={this.handleUnfocus('P', 'pid')}
                    inputComponent={NumberFormatCustom}
                  />
                  <FormHelperText>Proportional</FormHelperText>
                </FormControl>
                <FormControl margin='normal' style={{marginLeft:'3.5%',marginRight:'3.5%',width:'31%'}}>
                  <InputLabel htmlFor="name-simple">I</InputLabel>
                  <Input
                    value={settings.pid.I}
                    onChange={this.handleTextChange('I', 'pid')}
                    onBlur={this.handleUnfocus('I', 'pid')}
                    inputComponent={NumberFormatCustom}
                  />
                  <FormHelperText>Integral</FormHelperText>
                </FormControl>
                <FormControl margin='normal' style={{width:'31%'}}>
                  <InputLabel htmlFor="name-simple">D</InputLabel>
                  <Input
                    value={settings.pid.D}
                    onChange={this.handleTextChange('D', 'pid')}
                    onBlur={this.handleUnfocus('D', 'pid')}
                    inputComponent={NumberFormatCustom}
                  />
                  <FormHelperText>Derivative</FormHelperText>
                </FormControl>
                <FormControl margin='normal' fullWidth>
                  <InputLabel htmlFor="name-simple">t</InputLabel>
                  <Input
                    value={settings.pid.t}
                    onChange={this.handleTextChange('t', 'pid')}
                    onBlur={this.handleUnfocus('t', 'pid')}
                    inputComponent={NumberFormatCustom}
                  />
                  <FormHelperText>Time Window (milliseconds)</FormHelperText>
                </FormControl>
                <FormControl margin='normal' style={{width:'48.25%',marginRight:'3.5%'}}>
                  <InputLabel htmlFor="name-simple">Min</InputLabel>
                  <Input
                    value={settings.pid.minOutput}
                    onChange={this.handleTextChange('minOutput', 'pid')}
                    onBlur={this.handleUnfocus('minOutput', 'pid')}
                    inputComponent={NumberFormatCustom}
                  />
                  <FormHelperText>Minimum Output in %</FormHelperText>
                </FormControl>
                <FormControl margin='normal' style={{width:'48.25%'}}>
                  <InputLabel htmlFor="name-simple">Max</InputLabel>
                  <Input
                    value={settings.pid.maxOutput}
                    onChange={this.handleTextChange('maxOutput', 'pid')}
                    onBlur={this.handleUnfocus('maxOutput', 'pid')}
                    inputComponent={NumberFormatCustom}
                  />
                  <FormHelperText>Maximum Output in %</FormHelperText>
                </FormControl>
                <FormControl margin='normal' fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.pid.reverse}
                        onChange={this.handleTextChange('reverse', 'pid')}
                        value={String(settings.pid.reverse)}
                        classes={{
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Reverse Direction"
                  />
                </FormControl>
                <div className='row no-gutters' style={{marginTop:'20px'}}>
                  <div className='col' style={{width:'98.25%',marginRight:'1.75%'}}>
                    <Typography type='display1' component='h2' align='left'>
                      Sparge
                    </Typography>
                    <Divider light style={{marginTop:'10px'}}/>
                    <FormControl margin='normal' fullWidth>
                      <InputLabel htmlFor="name-simple">Max</InputLabel>
                      <Input
                        value={settings.sparge.maxOutput}
                        onChange={this.handleTextChange('maxOutput', 'sparge')}
                        onBlur={this.handleUnfocus('maxOutput', 'sparge')}
                        inputComponent={NumberFormatCustom}
                      />
                      <FormHelperText>Maximum Output in %</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col' style={{width:'98.25%',marginLeft:'1.75%'}}>
                    <Typography type='display1' component='h2' align='left'>
                      Boil
                    </Typography>
                    <Divider light style={{marginTop:'10px'}}/>
                    <FormControl margin='normal' fullWidth>
                      <InputLabel htmlFor="name-simple">Output</InputLabel>
                      <Input
                        value={settings.boil.output}
                        onChange={this.handleTextChange('output', 'boil')}
                        onBlur={this.handleUnfocus('output', 'boil')}
                        inputComponent={NumberFormatCustom}
                      />
                      <FormHelperText>Output in %</FormHelperText>
                    </FormControl>
                  </div>
                </div>
                <div style={{marginTop:'10px',height:'68px'}}>
                  <div style={{float:'right'}}>
                    <div className={classes.wrapper}>
                      <Button fab color="primary" className={buttonClassname} onClick={this.handleSaveButtonClick}>
                        {success ? <CheckIcon /> : <SaveIcon />}
                      </Button>
                      {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                    </div>
                  </div>
                  <div style={{float:'right',right:'120px'}}>
                    <div className={classes.wrapper}>
                      <Button fab color="primary" onClick={this.handleRefreshButtonClick}>
                        {<RefreshIcon />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  settings: state.brewerySettings
})

export default withStyles(styles)(connect(mapStateToProps, {
})(_Settings))
