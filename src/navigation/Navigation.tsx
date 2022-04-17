import Dashboard from '../pages/Dashboard'

export const routes = [
    {
        path: '/',
        component: Dashboard,
    },
]

// export const PrivateRoute = (route: any) => {

//   return (
//     <Route
//       path={route.path}
//       render={(props) =>

//         <Redirect
//           to={{
//             pathname: '/',
//             state: { from: props.location },
//           }}
//         />
        
//         )
// }
// />
//   );
// };
