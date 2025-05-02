import { formatDateBR, formatMoney } from "@/components/AllFormat";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent } from "@/components/ui/sheet";
import ProductsListServices from "@/services/ProductsList";
import type { ProductItemCancelled } from "@/types/productList";
import { Copy, Info, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";



export default function CancelledDescription({product}: {product?: ProductItemCancelled}) {

    // Get Products Cancelled/Refund
    const { mutate: fetchProductInfo ,data: productInfo } = ProductsListServices.getProductInfo(product?.product_id as string);
    useEffect(() => {
        if(product?.product_id){
            fetchProductInfo()
        }
    },[product?.product_id])

    return (
        <SheetContent className="h-[95vh] !p-0" side="bottom" >
            <div className="h-[70px] border-b flex items-center justify-between px-4">
                <p>Detalhes da compra</p>
            </div>
            <ScrollArea className="h-[calc(95vh-140px)] w-full">
                <div className="container !p-0 !my-0 !px-4 flex flex-col  ">

                    {/* Img */}
                    <div className="border-b py-8 flex gap-[32px]">
                        <div>
                            <img className="w-[200px] h-[200px] rounded-lg" src={product?.product_image} alt={product?.product_name} />
                        </div>
                        <div>
                            <p className="text-[#707780]">{productInfo?.category}</p>
                            <p className="text-[36px] text-[#191c1f] font-bold">{product?.product_name}</p>
                            <p className="text-[#191c1f]">{productInfo?.product_owner} <span className="text-primary">{productInfo?.product_owner_email}</span></p>
                            <p className="text-[12px] text-gray-500">Em caso de dúvida, entre em contato com o produtor.</p>
                        </div>
                    </div>

                    {/* Alert */}
                    <div className="border-b py-8 flex flex-col gap-8">
                        {/*  */}
                        <div className="h-[140px] bg-tertiary rounded p-[16px] flex gap-4">
                            <Info size={20} className="text-primary" />
                            <div className="flex flex-col justify-between">
                                {productInfo?.refund_status === "pending" && (
                                    <div className="flex flex-col gap-1">
                                        <p className="text-primary font-semibold">Seu pedido de reembolso está em análise. <span className="font-normal">Data de análise: {formatDateBR(productInfo.refund_deadline)}</span></p>
                                        <p className="text-primary">Espere em quanto nossa equipe faz a analise do seu pedido.</p>
                                    </div>
                                )}
                                {productInfo?.refund_status === "paid" && (
                                    <div className="flex flex-col gap-1">
                                        <p className="text-primary font-semibold">Seu reembolso foi processado em {formatDateBR(productInfo.refund_deadline)}.</p>
                                        <p className="text-primary">A transação foi confirmada pela processadora de pagamentos.</p>
                                    </div>
                                )}
                                {productInfo?.refund_status === "refused" && (
                                    <div className="flex flex-col gap-1">
                                        <p className="text-primary font-semibold">Seu pedido de reembolso foi recusado em {formatDateBR(productInfo.refund_deadline)}.</p>
                                        <p className="text-primary">Entre em contato para maiores informações.</p>
                                    </div>
                                )}
                                <div>
                                    <Button disabled>
                                        Mostrar detalhes
                                        <MoveUpRight size={20}/>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div>
                            <p className="text-[20px] text-[#32363b] font-semibold">Conteúdo do produto</p>
                            <p className="text-gray-500">Acesse ou baixe o conteúdo desse produto.</p>
                        </div>

                        {/*  */}
                        <div className="flex gap-4 bg-tertiary rounded p-[16px]">
                            <MoveUpRight size={20}/>
                            <div>
                                <p className="text-[#32363b]">
                                    Ao acessar o conteúdo, você será redirecionado para uma {" "}
                                    <span className="font-semibold">
                                        área externa do próprio produtor.
                                    </span> {" "}
                                    Em caso de dúvidas fale com
                                    <br />
                                    <span className="text-primary">
                                        suporte@abrunapereira.com.br .
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Historical */}
                    <div className="flex flex-col gap-8 py-8">
                        <div>
                            <p className="text-[20px] font-semibold">Histórico de transações</p>
                            <p className="text-gray-500">Encontre todas as transações realizadas neste produto.</p>
                        </div>
                        <div>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="01" className="p-[24px] border rounded-lg bg-tertiary ">
                                    <AccordionTrigger className="w-full pr-4 rounded-lg  flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-[20px] font-semibold">
                                                {product?.order_id}
                                            </p>
                                            <Copy
                                                size={24}
                                                className="text-primary cursor-pointer"
                                                onClick={(e) => {
                                                    if (product?.order_id) {
                                                        navigator.clipboard.writeText(product.order_id)
                                                        toast.success("ID copiado com sucesso!")
                                                        e.stopPropagation()
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className={`${
                                                productInfo?.refund_status === "paid"
                                                    ? "text-green-700"
                                                    : productInfo?.refund_status === "pending"
                                                    ? "text-yellow-500"
                                                    : productInfo?.refund_status === "refused"
                                                    ? "text-red-700"
                                                    : "text-gray-500"
                                            }`}>
                                            {productInfo?.refund_status === "paid"
                                                ? "Reembolso realizado"
                                                : productInfo?.refund_status === "pending"
                                                ? "Reembolso pendente"
                                                : productInfo?.refund_status === "refused"
                                                ? "Reembolso recusado"
                                                : productInfo?.refund_status}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex gap-[100px] w-full mt-8">
                                            <div className="flex flex-col text-[14px] gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Data da compra:</span>
                                                    <span className="">{formatDateBR(productInfo?.created_at)}</span>
                                                </div>
                                            
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Data do pagamento:</span>
                                                    <span className="">{formatDateBR(productInfo?.created_at)}</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Valor:</span>
                                                    <span className="">{formatMoney(productInfo?.amount, productInfo?.currency as string)}</span>
                                                </div>
                                            </div>
                                                
                                            <div className="flex flex-col text-[14px] gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Criado por:</span>
                                                    <span className="">{productInfo?.product_owner}</span>
                                                </div>
                                        
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Email:</span>
                                                    <p className="text-primary">{productInfo?.product_owner_email}</p>
                                                    <Copy 
                                                        size={20} 
                                                        className="text-primary cursor-pointer"
                                                        onClick={(e) => {
                                                            if (productInfo?.product_owner_email) {
                                                                navigator.clipboard.writeText(productInfo.product_owner_email)
                                                                toast.success("ID copiado com sucesso!")
                                                                e.stopPropagation()
                                                            }
                                                        }}
                                                    /> 
                                                </div>
                                        
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Reembolso:</span>
                                                    {productInfo?.refund_status === "pending" 
                                                        ? <span className="text-yellow-500">Em Análise</span>
                                                        : productInfo?.refund_status === "paid" 
                                                        ? <span className="text-green-700">Pago</span>
                                                        : productInfo?.refund_status === "refused" 
                                                        ? <span className="text-red-700">Recusado</span>
                                                        : <span className="text-gray-500">{productInfo?.refund_status}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                </div>
            </ScrollArea>
            <div className="h-[70px] border-t  flex items-center justify-between px-8">
                <div className="flex gap-2 items-center text-primary">
                    <p>
                        Central de ajuda
                    </p>
                    <Info size={20}/>
                </div>
                <div>
                    {/* <Button variant={"outline"} className="">
                        Avalie o produto
                    </Button> */}
                </div>
            </div>
        </SheetContent>
    );
}