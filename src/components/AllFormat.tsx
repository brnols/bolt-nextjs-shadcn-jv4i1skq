// Todos os formatadores de textos

// Clean Number
export const formatNumberClean = (value: string | undefined): string => {
    return value ? value.replace(/\D/g, "") : "";
};

// Telefone
export const formatPhone = (value: string | undefined): string => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 11) {
        const countryCode = cleaned.slice(0, cleaned.length - 11);
        const area = cleaned.slice(cleaned.length - 11, cleaned.length - 9);
        const number = cleaned.slice(cleaned.length - 9);
        let formattedNumber: string;
        if (number.length === 9) {
            formattedNumber = `${number.slice(0, 5)}-${number.slice(5)}`;
        } else if (number.length === 8) {
            formattedNumber = `${number.slice(0, 4)}-${number.slice(4)}`;
        } else {
            formattedNumber = number;
        }
        return `+${countryCode} (${area}) ${formattedNumber}`;
    }
    const area = cleaned.slice(0, 2);
    const number = cleaned.slice(2);
    let formattedNumber: string; 
    if (number.length === 9) {
        formattedNumber = `${number.slice(0, 5)}-${number.slice(5)}`;
    } else if (number.length === 8) {
        formattedNumber = `${number.slice(0, 4)}-${number.slice(4)}`;
    } else {
        formattedNumber = number;
    }
    return `(${area}) ${formattedNumber}`;
};

//  CPF
export const formatCPF = (value: string | undefined): string => {
    if (!value) return "";
    const cpf = value.replace(/\D/g, "").substring(0, 11);
    return cpf.length > 9
        ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4")
        : cpf.length > 6
        ? cpf.replace(/^(\d{3})(\d{3})(\d+)/, "$1.$2.$3")
        : cpf.length > 3
        ? cpf.replace(/^(\d{3})(\d+)/, "$1.$2")
        : cpf;
};

//  CNPJ
export const formatCNPJ = (value: string | undefined): string => {
    if (!value) return "";
    const cnpj = value.replace(/\D/g, "").substring(0, 14);
    return cnpj.length > 12
        ? cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        : cnpj.length > 8
        ? cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4")
        : cnpj.length > 5
        ? cnpj.replace(/^(\d{2})(\d{3})(\d+)/, "$1.$2.$3")
        : cnpj.length > 2
        ? cnpj.replace(/^(\d{2})(\d+)/, "$1.$2")
        : cnpj;
};

// CEP
export const formatCEP = (value: string | undefined): string => {
    if (!value) return "";
    const cep = value.replace(/\D/g, "").substring(0, 8);
    return cep.length > 5 ? cep.replace(/^(\d{5})(\d+)/, "$1-$2") : cep;
};

export const formatInputFloat = (value: string | undefined): number => {
    if (!value) return 0.0;
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue === "") return 0.0; 
    const numericValue = Number.parseFloat(cleanValue) / 100;
    return Number(numericValue.toFixed(2)); 
};

// Money
export const formatMoney = ( value: number | undefined, currencyCode: string ): string => {
    const currenciesWithDecimals = ["BRL", "USD", "EUR", "GBP", "AUD"];
    if (value === undefined) {
        if (currenciesWithDecimals.includes(currencyCode)) {
            if (["BRL", "EUR"].includes(currencyCode)) {
                return currencyCode === "BRL" ? "R$ 0,00" : "€0,00";
            }

            if (["USD", "GBP", "AUD"].includes(currencyCode)) {
                const symbol =
                    currencyCode === "USD"
                        ? "$"
                        : currencyCode === "GBP"
                        ? "£"
                        : "A$";
                return `${symbol}0.00`; // ✅ Uso de template literal
            }
        }

        if (currencyCode === "JPY") {
            return "¥0";
        }

        return "0";
    }
    if (currenciesWithDecimals.includes(currencyCode)) {
        if (["BRL", "EUR"].includes(currencyCode)) {
            // Usa locale para formatação com 2 casas decimais e vírgula como separador decimal.
            const formattedValue = Number(value).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            return `${currencyCode === "BRL" ? "R$ " : "€"}${formattedValue}`; // ✅ Uso de template literal
        }

        if (["USD", "GBP", "AUD"].includes(currencyCode)) {
            const symbol =
                currencyCode === "USD"
                    ? "$"
                    : currencyCode === "GBP"
                    ? "£"
                    : "A$";
            const formattedValue = Number(value).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            return `${symbol}${formattedValue}`; // ✅ Uso de template literal
        }
    }
    if (currencyCode === "JPY") {
        const intValue = Math.round(value);
        const formattedValue = intValue.toLocaleString("en-US");
        return `¥${formattedValue}`; // ✅ Uso de template literal
    }
    return String(value);
};

// formatador de data (add no component)
export const formatDateBR = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
