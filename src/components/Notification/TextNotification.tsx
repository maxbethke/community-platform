import * as React from 'react'
import Icon, { IGlyphs } from '../Icons'
import Text from '../Text'
import { FlexContainer } from '../Layout/FlexContainer'

/*  
    This component displays a simple text inline as a notification. By default the message hides after a few seconds
*/
interface IState {
  show: boolean
}
interface IProps {
  text: string
  show: boolean
  duration?: number
  icon?: keyof IGlyphs
}
export class TextNotification extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { show: props.show }
  }
  static defaultProps: Partial<IProps> = {
    duration: 3000,
  }

  // whenever props changed trigger notification
  componentWillReceiveProps() {
    console.log('next props')
    this.triggerNotification()
  }

  componentDidMount() {
    this.triggerNotification()
  }
  triggerNotification() {
    if (this.props.show) {
      console.log('showing notification', this.props.duration)
      this.setState({
        show: true,
      })
      setTimeout(() => {
        this.setState({ show: false })
      }, this.props.duration)
    }
  }

  render() {
    const { text, icon } = this.props
    const { show } = this.state
    return show ? (
      <FlexContainer p={0} mt={1} alignItems="center">
        {icon && <Icon glyph={icon} />}
        <Text>{text}</Text>
      </FlexContainer>
    ) : null
  }
}
