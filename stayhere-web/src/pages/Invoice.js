import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

const Invoice = () => {
    const [errorValue, setErrorValue] = useState("");
    const [invoice, setInvoice] = useState();
    const [searchParams] = useSearchParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/invoice/get/${searchParams.get("invoiceId")}`)
            .then((response) => {
                if (response.status !== 200)
                    setErrorValue(response.statusText)
                else {
                    setInvoice(response.data)
                }
            })
            .catch(error => setErrorValue(error.response?.data ?? "Unknown error"))
    }, [searchParams])
    return (
        <>
            {errorValue.length > 0 && <div className="text-white text-center strong bg-danger">{errorValue}</div>}
            {errorValue.length === 0 &&
                <div className="border border-1 p-2">
                    <div className="text-end mb-3">Invoice: {invoice?.InvoiceNumber}</div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <div className="text-decoration-underline">Sender:</div>
                            <div className="col-4">Stay Here <br /> Vaclavske Namesti 1<br /> 11000 Prague<br />Czech Republic</div>
                        </div>
                        <div className="col-6">
                            <div className="text-decoration-underline">Receiver:</div>
                            <div className="col-4">{invoice?.Receiver} <br /> {invoice?.Address}</div>
                        </div>
                    </div>
                    <div className="border-top border-1 pt-3 text-center">{invoice?.Description}</div>
                    <div className="row border-top border-1 mt-3">
                        <div className="col-8">Description</div>
                        <div className="col-4">Price</div>
                    </div>
                    {
                        invoice?.Items?.map(item =>
                            <div key={item.InvoiceItemId} className="row border-top border-1">
                                <div className="col-8">{item.Description}</div>
                                <div className="col-4">{item.Price}</div>
                            </div>
                        )
                    }

                    <div className="row border-top border-1">
                        <div className="col-8 text-end">Total Price: </div>
                        <div className="col-4">{invoice?.Items?.reduce((a, b) => a + b.Price, 0)}</div>
                    </div>
                </div>
            }
        </>
    )
}

export default Invoice