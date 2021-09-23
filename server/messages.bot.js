const msgNotSession = `-----------------------------------------------------------
                            *Sign In* 
-----------------------------------------------------------
*⚠¡Advertencia por favor escriba los comando tal y como se muestran en las opciones!⚠*
-----------------------------------------------------------
1: /signIn <correo> <password>
-----------------------------------------------------------
*<example>*: Significa que te pide un dato despues del comando.
`

const msgStart = `-----------------------------------------------------------
                        *Comandos* 
-----------------------------------------------------------
*⚠¡Advertencia por favor escriba los comando tal y como se muestran en las opciones!⚠*
-----------------------------------------------------------
1: /getUsers
2: /countUsers
3: /genAccessCode
4: /logOut
-----------------------------------------------------------
*<label>*: Significa que te pide un dato despues del comando.
`

const msgCountUsers = users => `-----------------------------------------------------------
                    *Count Users* 
-----------------------------------------------------------
Usuarios Registrados:                        ${users.length}
Admin Registrados:                            ${users.filter(user => user.role === 'Admin').length}
Usuarios Bloqueados:                        ${users.filter(user => user.block === true).length}
-----------------------------------------------------------
`

const msgGenAccessCode =  `-----------------------------------------------------------
            *Generate Access Code* 
-----------------------------------------------------------
Utilice el siguiente comando 
*/genAccessCode*

Despues de escribir el comando de un espacio y ponga el numero del area de trabajo y el role del usuario.

> Ejemplo: 
*/genAccessCode 5 user* 
                        o 
*/genAccessCode 5 admin*

Tambien pude Asignar dos areas de trabajo dejando un espacio despues de la primera area de trabajo.

> Ejemplo: 
*/genAccessCode 5 1 user* 
                        o 
*/genAccessCode 5 1 admin*
-----------------------------------------------------------
                *Work Areas*
-----------------------------------------------------------
1: Office
2: Secretary to the director
3: Schoolchildren
4: Promotion and Liaison
5: Administrative Resources
6: Injunction
7: Prefecture
8: Social Work
9: Technical Training
10: Library
11: Quality
12: Infrastructure
13: Computing
-----------------------------------------------------------
`

module.exports = {
    msgNotSession,
    msgStart,
    msgCountUsers,
    msgGenAccessCode
}