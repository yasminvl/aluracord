import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState("");
    const [ListaDeMensagens, setListaDeMensagens] = React.useState([]);


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: ListaDeMensagens.length + 1,
            de: "yasminvl",
            texto: novaMensagem,
        }
        setListaDeMensagens([
            mensagem,
            ...ListaDeMensagens,
        ]);
        mensagem;
        setMensagem("");
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://media1.giphy.com/media/dwaeIbBnF6HBu/giphy.gif?cid=ecf05e47z827iru7ce02gcvsoioy4qy4unjx8inw9u048ucr&rid=giphy.gif&ct=g)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    height: '100%',
                    maxWidth: '50%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* deveria ser assim -------- <MessageList ListaDeMensagens={ListaDeMensagens}/>*/}
                    <MessageList mensagens={ListaDeMensagens} handleDelete={(id) => {
                        setListaDeMensagens(
                            ListaDeMensagens.filter((e) => {
                                return e.id != id;
                            })
                        );
                    }} />
                    {/* {ListaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Didite algo..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[300],
                                marginRight: '12px',
                                color: appConfig.theme.colors.primary[900],
                            }}
                        />
                        <Button
                            iconName="arrowRight"
                            onClick={(e) => {
                                if (mensagem.length > 0) {
                                    e.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    label='Logout'
                    href="/"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.primary[900],
                        mainColor: appConfig.theme.colors.neutrals[300],
                        mainColorLight: appConfig.theme.colors.primary[500],
                        mainColorStrong: appConfig.theme.colors.primary[900],
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (

                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            display: "flex",
                            justifyContent: "space-between",

                            borderRadius: "5px",
                            padding: "6px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "8px",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                }}
                                src={`https://github.com/yasminvl.png`}
                            />
                            <Box
                                styleSheet={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    styleSheet={{
                                        marginRight: "10px",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <Text
                                        tag="strong"
                                        styleSheet={{
                                            fontWeight: "bold",
                                            color: appConfig.theme.colors.primary[200],
                                        }}
                                    >
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: "10px",
                                            marginLeft: "8px",
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {new Date().toLocaleDateString()}
                                    </Text>
                                </Box>
                                <Text
                                    styleSheet={{
                                        width: "100%",
                                        wordBreak: "break-all",
                                    }}
                                    tag="p"
                                >
                                    {mensagem.texto}
                                </Text>
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                onClick={() => {
                                    props.handleDelete(mensagem.id);
                                }}
                                label="X"
                                variant="tertiary"
                                // iconName="trashAlt"
                                size="sm"
                                styleSheet={{
                                    height: "20px",
                                    width: "20px",
                                    padding: "0",
                                }}
                                buttonColors={{
                                    contrastColor: "#FFFFFF",
                                    mainColor: appConfig.theme.colors.neutrals[400],
                                    mainColorLight: appConfig.theme.colors.neutrals[500],
                                    mainColorStrong: appConfig.theme.colors.neutrals[100],
                                }}
                            />
                        </Box>
                    </Text>
                );
            })}


        </Box>
    )
}