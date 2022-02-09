import { Switch, Route } from 'react-router-dom'
import Products from '../pages/Products/Products'

const Routes = () => {

    return (
        <Switch>
            <Route path="/" render={() => <Products />} />
        </Switch>
    )
}


export default Routes