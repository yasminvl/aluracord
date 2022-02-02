import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

import appConfig from '../config.json';

import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { MdLogin, MdDelete } from "react-icons/md";


// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPBASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM3ODUzNiwiZXhwIjoxOTU4OTU0NTM2fQ.zoMXw6NTT2jlzj19HtmtpepOYoayngzmtdOV8pM4u-o';
const SUPBASE_URL = 'https://oawybanhocjwfxxtmjvl.supabase.co';
const supabaseClient = createClient(SUPBASE_URL, SUPBASE_ANON_KEY);

//  SE FOSSE SEM A LIB SERIA ASSIM -----------------


//   fetch(`${SUPBASE_URL}/rest/v1/mensagens?select=*`, {
//      headers: {
//          'Content- type': 'application/json',
//          'apikey': SUPBASE_ANON_KEY,
//          'Authorization': 'Bearer' + SUPBASE_ANON_KEY,
//      }
//   })
//      .then((res) => {
//          return res.json();
//      })
//      .then((response) => {
//          console.log(response);
//      });

function escutaMsgTempoReal(adicionarMsg) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionarMsg(respostaLive.new);
        })
        .subscribe();
}


export default function ChatPage() {
    const roteamento = useRouter();
    const usuario = roteamento.query.username;
    const [mensagem, setMensagem] = useState("");
    const [ListaDeMensagens, setListaDeMensagens] = useState([
        //{
        //    id: 1,
        //    de: "yasminvl",
        //    texto: ':sticker: https://media0.giphy.com/media/L6fzaiLN5zymY5pdmO/giphy.gif',
        //},
        //{
        //    id: 2,
        //    de: "peas",
        //    texto: 'Ternario e triste',
        //},
    ]);

    //imagem Loagin
    const [imgLoadin, setImgLoagin] = useState(true)

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log("dados da consulta: ", data)
                setListaDeMensagens(data);
                setImgLoagin(false);
            });

        escutaMsgTempoReal((novaMensagem) => {
            console.log('Nova mensagen: ', novaMensagem);
            // Quero reusar um valor de referencia (objeto/array)
            // Passar uma funçao para setState

            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
            //handleNovaMensagem(novaMensagem);
        });
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: ListaDeMensagens.length + 1,
            de: usuario,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                //    setListaDeMensagens([
                //        data[0],
                //         ...ListaDeMensagens,
                //    ]);
            })

        setMensagem("");
    }

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
                    {imgLoadin ?
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '80%',
                                marginBottom: '4rem',

                            }}
                        >
                            <Image
                                styleSheet={{
                                    opacity: '.1',
                                }}
                                src={'https://media1.giphy.com/media/MTKsRM3QzNeOI59SbO/giphy.gif?cid=ecf05e472b0cy9nd33m7m7m6kk2to8zcngve1o1nb1w5g9k7&rid=giphy.gif&ct=g'}
                            />

                        </Box>
                        :
                        <MessageList mensagens={ListaDeMensagens} setMensagens={setListaDeMensagens} supabaseClient={supabaseClient} />}
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
                        {/* CallBack */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                //console.log('[USANDO O COMPONENTE] salvar no banco', sticker);
                                handleNovaMensagem(`:sticker: ${sticker}`);
                            }}
                            styleSheet={{
                                height: "20px",
                                width: "20px",
                                padding: "0",
                            }}

                        />
                        {/* botao enviar*/}
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
                            styleSheet={{
                                borderRadius: '50%',
                                padding: '0',
                                minWidth: '45px',
                                minHeight: '47px',
                                margin: '1px 1px 8px 1px',
                            }}

                        />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5' styleSheet={{ color: appConfig.theme.colors.primary[700] }}>
                    Online: 1
                </Text>
                <Box
                    styleSheet={{ display: 'flex', flexDirection: 'column' }}
                >
                    <a href={`https://github.com/${useRouter().query.username}`} target="_blank">
                        <Image
                            styleSheet={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                margin: '5px'
                            }}
                            src={`https://github.com/${useRouter().query.username}.png`}
                        />
                    </a>
                    <Text variant='heading5' styleSheet={{ textAlign: 'center', color: appConfig.theme.colors.primary[500] }}>
                        {useRouter().query.username}
                    </Text>

                </Box>
                {/*<iframe src="https://open.spotify.com/embed/album/4LH4d3cOWNNsVw41Gqt2kv?utm_source=generator&theme=0" width="25%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>*/}
                <Button
                    variant='tertiary'
                    label={<MdLogin />}
                    href="/"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.primary[900],
                        mainColor: appConfig.theme.colors.neutrals['000'],
                        mainColorLight: appConfig.theme.colors.primary[500],
                        mainColorStrong: appConfig.theme.colors.primary[900],
                    }}
                />
            </Box>
        </>
    )
}


function MessageList(props) {


    //console.log(props);
    function handleDeleteMensagem(id) {


        const listaMensagensFiltered = props.mensagens.filter(
            messageFiltered => messageFiltered.id !== id
        );

        props.supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: id })
            .then(() => {
                props.setMensagens(listaMensagensFiltered);
            })
    }
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
                                src={`https://github.com/${mensagem.de}.png`}
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

                                    {/*Declarativo
                                    Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                                    {mensagem.texto.startsWith(':sticker:') ? (
                                        <Image src={mensagem.texto.replace(':sticker:', '')}
                                            styleSheet={{
                                                width: '50%',
                                                borderRadius: '5px',
                                                padding: '10px',
                                            }} />
                                    ) : (
                                        mensagem.texto
                                    )}


                                    {/* if mensagem de texto possui stickers:
                                    mostra a imagem
                                else
                                    mensagem.texto*/}

                                    {/*{mensagem.texto}*/}
                                </Text>
                            </Box>
                        </Box>
                        <Box>


                            {(mensagem.de === useRouter().query.username) && <MdDelete
                                onClick={e => {
                                    e.preventDefault();
                                    handleDeleteMensagem(mensagem.id);
                                }}
                                type='button'
                                name='FaTrash'
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />}
                            {/*<Button
                                onClick={() => {
                                    if (mensagem.de === mensagem.de) {

                                        handleDeleteMensagem(mensagem.id);
                                    } else {
                                        alert('Não foi possivel apagar!')
                                    }
                                }}
                                label='x'
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
                            />*/}
                        </Box>
                    </Text>
                );
            })}


        </Box>
    )
}