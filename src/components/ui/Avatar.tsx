interface Props {
    url: string,
    alt: string 
}

const Avatar = (props: Props) => {
    return <img src={props.url} width={32} style={{borderRadius: 6}} alt={props.alt} />
}

export default Avatar 