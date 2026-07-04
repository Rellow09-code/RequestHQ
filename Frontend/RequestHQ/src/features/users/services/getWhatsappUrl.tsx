export default function getWhatsappUrl(target_phone:string, message:string){
    const encoded_message = encodeURIComponent(message);
    const url = `https://wa.me/${target_phone}?text=${encoded_message}`;
    return `Successfully set to whatsapp!`
}