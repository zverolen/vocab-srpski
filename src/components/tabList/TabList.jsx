import PropTypes from 'prop-types'

export default function TabList({ children }) {
  return (<div role="tablist" data-testid="tablist">{ children }</div>)
}

TabList.propTypes = {
  children: PropTypes.element.isRequired
}