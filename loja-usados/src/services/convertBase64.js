// convertBase64.js
// Função para converter a imagem para Base64
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Retorna o resultado do arquivo como Base64
        reader.onerror = reject; // Se ocorrer erro, rejeita a Promise
        reader.readAsDataURL(file); // Converte o arquivo para Base64
    });
};