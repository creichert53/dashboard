import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import red from 'material-ui/colors/red'
import NewRecipeButton from './NewRecipeButton'
import fastXmlParser from 'fast-xml-parser'
import ReactHighcharts from 'react-highcharts'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { XmlEntities } from 'html-entities'
const entities = new XmlEntities()

import SRM from './SRM'
import IngredientTable from './IngredientTable'
import Recipe from './Recipe'
const srm = new SRM()
const beer = new Recipe()

const createSliderWithTooltip = Slider.createSliderWithTooltip
const SliderWithTooltip = createSliderWithTooltip(Slider)

const styles = theme => ({
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
})

var timeInterval
class _Brew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      data: [(new Date()).valueOf(), 0.5]
    }
  }

  componentDidMount = () => {
    this.startTimer()
  }

  componentWillUnmount = () => {
    console.log('Unmounting')
    clearInterval(timeInterval)
  }

  startTimer = () => {
    timeInterval = setInterval(() => {
      const newData = this.state.data
      newData.push([(new Date()).valueOf(), Math.sin(this.state.count/4.0)])
      if (this.state.count > 100 || (newData.length > -1 && newData[0] < (new Date()).setHours(0,0,0,0).valueOf())) newData.shift()
      this.setState({
        data: newData,
        count: this.state.count + 1
      })
    }, 1000)
  }

  render() {
    const { value, classes, recipe } = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-12' style={{marginTop:'20px'}}>
            <Card>
              <CardContent>
                <SliderWithTooltip
                  min={-5}
                  max={5}
                  tipProps={{placement:'bottom'}}
                  step={0.1}
                />
              </CardContent>
            </Card>
            <Card style={{marginTop:'20px'}}>
              <CardContent>
                <ReactHighcharts
                  config = {{
                    chart: {
                      type: 'spline'
                    },
                    title: {
                      text: 'Strike Water'
                    },
                    yAxis: {
                      title: {
                        text: 'Temperature'
                      }
                    },
                    xAxis: {
                      type: 'datetime',
                      dateTimeLabelFormats: { // don't display the dummy year
                        month: '%b \'%y',
                        year: '%Y'
                      }
                    },
                    legend: {
                      layout: 'vertical',
                      align: 'right',
                      verticalAlign: 'middle'
                    },
                    plotOptions: {
                      series: {
                        label: {
                          connectorAllowed: false
                        },
                        animation: false
                      },
                      spline: {
                        marker: {
                          enabled: false
                        }
                      }
                    },
                    series: [
                      {
                        name: 'Installation',
                        data: this.state.data
                      }
                    ],
                    responsive: {
                      rules: [
                        {
                          condition: {
                            maxWidth: 500
                          },
                          chartOptions: {
                            legend: {
                              layout: 'horizontal'
                            }
                          }
                        }
                      ]
                    }
                  }} style={{marginTop:'50px'}}>
                </ReactHighcharts>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recipe: state.recipe
})

export default withStyles(styles)(connect(mapStateToProps, {
})(_Brew))
