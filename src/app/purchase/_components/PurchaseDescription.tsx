import { formatDateBR, formatMoney } from "@/components/AllFormat";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent } from "@/components/ui/sheet";
import type { ProductItem } from "@/types/productList";
import { Copy, Info } from "lucide-react";
import toast from "react-hot-toast";



export default function PurchaseDescription( {product}:{product: ProductItem}) {
    return (
        <SheetContent className="h-[95vh] !p-0" side="bottom" >
            <div className="h-[70px] border-b flex items-center justify-between px-4">
                <p>Detalhes da compra</p>
            </div>
            <ScrollArea className="h-[calc(95vh-140px)] w-full">
                <div className="container !p-0 !my-0 flex flex-col  ">

                    {/* Img */}
                    <div className="border-b py-8 flex gap-[32px]">
                        <div>
                            <img className="w-[200px] h-[200px]  rounded-lg" src={product.product.background_image} alt={product.product.name} />
                        </div>
                        <div className="flex flex-col justify-between ">
                            <div>
                                <p className="text-[#707780]">{product.product.category}</p>
                                <p className="text-[36px] text-[#191c1f] font-bold">{product.product.name}</p>
                                <p className="text-[#191c1f]">Criado por{" "}{product.product.support_name}{" "}<span className="text-primary">{product.product.support_email}</span></p>
                                <p className="text-[12px] text-gray-500">Em caso de dúvida, entre em contato com o produtor.</p>
                            </div>
                            <div>
                                <Button 
                                    onClick={() => {window.open(`/main/${product.product_id}`, '_blank')}}
                                    className="text-lg h-[50px] min-w-[200px]">
                                    Acessar conteúdo
                                </Button>
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
                                        <div className="flex gap-4  items-center">
                                            <p className="text-[20px] font-semibold">
                                                {product.order_id}
                                            </p>
                                            <Copy size={24} className="text-primary"
                                            onClick={(e) => {
                                                navigator.clipboard.writeText(product.order_id);
                                                e.stopPropagation();
                                                toast.success("Código copiado com sucesso!")
                                            }}
                                            /> 
                                        </div>
                                        <div>
                                            <p className={`text-xs w-[] md:text-sm font-semibold text-gray-700 ${product.recurrence_pending? "text-red-400" : ""}`}>
                                                {product.recurrence_pending? "Com pendência":"Nenhuma pendência" }
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex gap-[100px] w-full mt-8">
                                            <div className="flex flex-col text-[14px] gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Data da compra:</span>
                                                    <span className="">{formatDateBR(product.created_at)}</span>
                                                </div>
                                            
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Data do pagamento:</span>
                                                    <span className="">{formatDateBR(product.updated_at)}</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Valor:</span>
                                                    <span className="">{formatMoney(product.product.price, product.product.currency)}</span>
                                                </div>
                                            </div>
                                                
                                            <div className="flex flex-col text-[14px] gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Criado por:</span>
                                                    <span className="">{product.product.support_name}</span>
                                                </div>
                                        
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Email:</span>
                                                    <p className="text-primary">{product.product.support_email}</p>
                                                    <Copy 
                                                        size={20} 
                                                        className="text-primary cursor-pointer hover:text-primary/80" 
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(product.product.support_email);
                                                            toast.success("Email copiado com sucesso!")
                                                        }}
                                                    /> 
                                                </div>
                                        
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Prazo para reembolso{" "}</span>
                                                    {new Date(product.product.refund_deadline) < new Date() ? "expirou" : "expira"}:
                                                    <span className="text-sm md:text-md text-black"> {formatDateBR(product.product.refund_deadline)}</span>
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