export const formatCPF = (cpf) => {
    let formattedCPF = cpf.replace(/\D/g, ""); // Remove qualquer caractere não numérico

    // Aplica a formatação do CPF enquanto o usuário digita
    if (formattedCPF.length <= 3) {
        return formattedCPF;
    }
    
    if (formattedCPF.length <= 6) {
        return formattedCPF.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }

    if (formattedCPF.length <= 9) {
        return formattedCPF.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    }

    return formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
};

export const formatCEP = (cep) => {
    let formattedCEP = cep.replace(/\D/g, ""); // Remove qualquer caractere não numérico

    // Aplica a formatação do CEP enquanto o usuário digita
    if (formattedCEP.length <= 5) {
        return formattedCEP;
    }

    return formattedCEP.replace(/(\d{5})(\d{0,3})/, "$1-$2");
};