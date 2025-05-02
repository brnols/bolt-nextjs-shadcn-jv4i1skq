import { formatDateBR, formatMoney } from "@/components/AllFormat";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { ProductItem } from "@/types/productList";


export default function CardDescription({ list, open, close }: { list: ProductItem, open: boolean, close: (value:boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={() => close(false)}>
            <DialogContent className="[&>button]:hidden !max-w-[800px] md:max-w-[90vw] lg:max-w-[80vw] mx-auto px-4 md:px-10 py-6 md:py-10 flex flex-col gap-4 md:gap-6 overflow-y-auto max-h-[90vh]">
                <div className="flex flex-col sm:flex-row gap-4">
                    <img 
                        src={list.product.background_image} 
                        alt="" 
                        className="aspect-square h-[120px] sm:h-[160px] rounded-lg object-cover mx-auto sm:mx-0" 
                    />
                    <div className="flex flex-col gap-2">
                        <p className="text-sm md:text-md text-gray-600">{list.product.category}</p>
                        <p className="text-xl md:text-2xl font-semibold">{list.product.name}</p>
                        <div className="flex flex-col">
                            <p className="text-base md:text-lg font-normal">
                                Criado por {list.product.support_name} <br />
                                <span className="text-sm md:text-md font-normal text-blue-500 cursor-default break-all">
                                    {list.product.support_email}
                                </span>
                            </p>
                            <p className="text-xs text-gray-400">Em caso de dúvida, entre em contato com o produtor.</p>
                        </div>
                        <Button 
                            className="w-full sm:w-[150px] mt-2"
                            disabled={list.product.status !== "active"}
                            onClick={() => {window.open(`/main/${list.product_id}`, '_blank')}}
                        >
                            Acessar conteúdo
                        </Button>
                    </div>
                </div>
                <Separator/>
                <div>
                    <p className="text-md font-semibold">Histórico de transações</p>
                    <p className="text-sm text-gray-400">Encontre todas as transações realizadas neste produto.</p>
                </div>
                <div className="border bg-gray-100 rounded-lg px-3 md:px-4 py-2 flex flex-col gap-4 md:gap-6">
                    <div className="flex justify-between items-center">
                        <p className="w-auto text-sm md:text-md font-semibold break-all pr-2">
                            {list.order_id}
                        </p>
                        <p className={`text-xs w-[] md:text-sm font-semibold text-gray-600 ${list.recurrence_pending? "text-red-400" : ""}`}>
                            {list.recurrence_pending? "Com pendência":"Nenhuma pendência" }
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs md:text-sm text-gray-600">
                                Data da compra:<span className="text-sm md:text-md text-black"> {formatDateBR(list.created_at)}</span>
                            </p>
                            <p className="text-xs md:text-sm text-gray-600">
                                Data do pagamento:<span className="text-sm md:text-md text-black"> {formatDateBR(list.updated_at)}</span>
                            </p>
                            <p className="text-xs md:text-sm text-gray-600">
                                Valor: <span className="text-sm md:text-md text-black">{formatMoney(list.product.price, list.product.currency)}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-600">
                                Criado por: <span className="text-sm md:text-md text-black"> {list.product.support_name}</span>
                            </p>
                            <p className="text-xs md:text-sm text-gray-600">
                                Email: <span className="text-sm md:text-md text-blue-500 !cursor-default break-all"> {list.product.support_email}</span>
                            </p>
                            <p className="text-xs md:text-sm text-gray-600">
                                Prazo para reembolso{" "}
                                {new Date(list.product.refund_deadline) < new Date() ? "expirou" : "expira"}:
                                <span className="text-sm md:text-md text-black"> {formatDateBR(list.product.refund_deadline)}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
