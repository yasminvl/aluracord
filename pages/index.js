import React from "react";
import { useRouter } from "next/router";

import appConfig from "../config.json";

import { Box, Button, Text, TextField, Image } from '@skynexui/components';

async function getNome(user) {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const dados = await response.json()
    if (dados.message) {
        return false
    }
    return dados.name
}

async function getLocation(user) {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const dados = await response.json()
    if (dados.message) {
        return false
    }
    return dados.location
}

function Titulo(props) {
    const Tag = props.tag || "h1";
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
        `}</style>
        </>
    );
}

/*function HomePage() {
    return (
        <>
            <GlobalStyles />
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura Matrix</h2>
        </>
    )
}
export default HomePage;
*/

export default function PaginaInicial() {
    //const username = 'yasminvl';
    //const [username, setUsername] = React.useState('yasminvl');
    const roteamento = useRouter();

    const [username, setUsername] = React.useState('')
    const [dirty, setDirty] = React.useState(false)
    const [nome, setNome] = React.useState('')
    const [location, setLocation] = React.useState("")
    const [userlocation, setUserlocation] = React.useState('')
    const [found, setFound] = React.useState(true)

    function getUrl() {
        if (!found) {
            return 'https://media4.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=ecf05e47dk4v11pajk003o5prn635dtk475jh0hfccecgczg&rid=giphy.gif&ct=g'
        }
        if (username.length > 2) {
            return `https://github.com/${username}.png`
        }
        return 'https://i.imgur.com/O1zaVNB.png'
    }

    const loadUserlocation = async () => {
        const url = `https://api.github.com/users/${username}`
        let response = await fetch(url)
        let json = await response.json()
        setUserlocation(json.location)
    }
    React.useEffect(() => {
        loadUserlocation()
    }, [username])

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://media1.giphy.com/media/dwaeIbBnF6HBu/giphy.gif?cid=ecf05e47z827iru7ce02gcvsoioy4qy4unjx8inw9u048ucr&rid=giphy.gif&ct=g)'
                    ,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log('Alguém submeteu o form');
                            roteamento.push(`/chat?username=${username}`);
                            // window.location.href = '/chat';
                            {/* sem usar o nest seria assim: 
                                window.location.href = '/chat'; */}
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas {nome || ''}!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/*<input 
                        type="text"
                        value={yasminvl}
                        onChange={function (event) {
                            console.log("usuario")
                            //onde ta a variavel?
                            const valor = event.target.value;
                            // trocar o valor da variavel
                            // através do react e avise quem precisa
                            setUsername(valor);
                        }}
                    />*/}

                        <TextField
                            value={username}
                            placeholder='GitHub User'
                            onChange={function (event) {


                                console.log('usuario digitou', event.target.value);
                                //Onde está o valor?
                                let valor = event.target.value
                                //Trocar o valor da variável através do React
                                if (valor.length > 2) {
                                    getNome(valor).then((e) => {
                                        if (e) {
                                            setNome(e)
                                            setFound(true)
                                        } else {
                                            setNome('')
                                            setFound(false)
                                        }
                                    })
                                } else {
                                    setNome('')
                                    setFound(true)
                                }

                                setUsername(valor)
                                setDirty(true)


                                //AQUI---------
                                // console.log("usuario")
                                //onde ta a variavel?
                                //const valor = event.target.value;
                                // trocar o valor da variavel
                                // através do react e avise quem precisa
                                //setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />


                        {username.length <= 2 && dirty &&
                            <Text
                                styleSheet={{
                                    marginBottom: '10px', color: appConfig.theme.colors.primary["050"],
                                    fontFamily: 'Play',
                                }}
                            >
                                Digite mais que 2 caracteres
                            </Text>}

                        {!found &&
                            <Text
                                styleSheet={{
                                    marginBottom: '10px', color: appConfig.theme.colors.primary["050"],
                                    fontFamily: 'Play'
                                }}>
                                Usuário inválido
                            </Text>

                        }



                        <Button
                            disabled={username.length <= 2 || !found}

                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={getUrl()}
                        //src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: username.length <= 2 || !found
                                    ? appConfig.theme.colors.neutrals[800]
                                    : appConfig.theme.colors.primary[500],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            <p>{username || 'Usuario'}</p>
                        </Text>

                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: username.length <= 2 || !found
                                    ? appConfig.theme.colors.primary[""]
                                    : appConfig.theme.colors.neutrals[500],
                                padding: '3px 10px',
                                margin: '10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {userlocation}
                        </Text>


                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}