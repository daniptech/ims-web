import { include } from "named-urls";

export const routes={
login:include('/login',{
    self:''
}),
register:include('/register',{
    self:''
}),
home:include('/home',{
    dashboard:'inventory-dashboard'
})
}