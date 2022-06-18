export default function LoginRequiredRoute( {component, ...kwargs} ) {
    
    const {
        store: {jwtToken}
    } = useAppContext();

    return (
        <Route />
    )
}