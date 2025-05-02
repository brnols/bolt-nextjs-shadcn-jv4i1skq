import { Badge } from "@/components/ui/badge";

function getStatusInfo(status: string | boolean) {
    // Mapear cores para os status
    const statusColors: Record<string, string> = {
        ativo: "bg-green-400",
        Approved: "bg-green-400",
        active: "bg-green-400",
        enabled: "bg-green-400",
        success: "bg-green-400",
        indefinido: "bg-yellow-400",
        Pendente: "bg-yellow-400",
        inactive: "bg-yellow-400",
        pending: "bg-yellow-400",
        rejected: "bg-red-400",
        failed: "bg-red-400",
        refund: "bg-red-400",
        canceled: "bg-red-400",
        error: "bg-red-400",
        bloqueado: "bg-red-400",
        product_inativo: "bg-red-400",
    };

    // Mapear traduções para os status
    const statusTranslations: Record<string, string> = {
        ativo: "Ativo",
        Approved: "Aprovado",
        enabled: "Habilitado",
        product_inativo: "Inativo",
        indefinido: "Indefinido",
        Pendente: "Pendente",
        inactive: "Inativo",
        success: "Sucesso",
        failed: "Falha",
        canceled: "Cancelado",
        bloqueado: "Bloqueado",
        refund: "Reembolso",
        pending: "Pendente",
        error: "Error",
        active: "Ativo",
        rejected: "Recusado",
    };

    // Criar uma variável local para evitar reatribuição do parâmetro
    const normalizedStatus =
        typeof status === "boolean"
            ? status
                ? "ativo"
                : "product_inativo"
            : status;

    // Retornar cor e tradução com valores padrão caso o status não seja reconhecido
    return {
        color: statusColors[normalizedStatus] || "bg-gray-200", // Cor padrão
        translation:
            statusTranslations[normalizedStatus] || "Status desconhecido", // Tradução padrão
    };
}

export function formatStatus(status: string | boolean) {
    const { color, translation } = getStatusInfo(status);

    return (
        <Badge className={`text-white capitalize ${color}`}>
            {translation}
        </Badge>
    );
}