import { Button, FloatingLabel, Form, InputGroup, Table} from "react-bootstrap";
import { Loan, LoanParameters } from "./loanclass";
import { displayDollars } from "../main/GlobalFunctions";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip} from "recharts";


export const LoanComponent = () =>  {
    const [loan,setLoan]=useState<Loan>();
    const [initialOffset,setInitialOffset]=useState(0);
    const [additionalPayments,setAdditionalPayments]=useState(0);
    const [loanParameters,setLoanParameters]=useState<LoanParameters>({
        name: "Loan 1",
        date: new Date(),
        term: 360,
        principle: 400000,
        interestRate: 0.0608
    })
    useEffect(()=>{
        setLoan(new Loan(loanParameters,additionalPayments,initialOffset));
    },[loanParameters,initialOffset,additionalPayments])
    
    interface CustomTooltipProps {
      active?: boolean;
      payload?: { value: number }[];
      label?: Date;
    }
    
    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div style={{backgroundColor:"#FBFBFF", borderRadius:"10px",padding:"5px", border:"solid"}}>
            <div className="center">{`Date: ${label?.toLocaleDateString('en-AU')}`}</div>
            <div style={{textAlign:"center"}}>{displayDollars(payload[0].value)}</div>
          </div>
        );
      }
    
      return null;
    };
    
    return(
        <>   
            <div className="container">
                <div className="row loanParameters">
                    <div className="col-2" >
                        <FloatingLabel controlId="floatingSelect" label="Loan Duration">
                            <Form.Select aria-label="Floating label select example" defaultValue={360} onChange={(e) => {setLoanParameters({...loanParameters,term:Number(e.currentTarget.value)})}}>
                                <option  value={180}>15 years</option>
                                <option  value={240}>20 years</option>
                                <option  value={300}>25 years</option>
                                <option  value={360}>30 years</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                    <div className="col-3">
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                defaultValue={loanParameters.principle}
                                onChange={(e) => {setLoanParameters({...loanParameters,principle:Number(e.currentTarget.value)})}} />
                        </InputGroup>
                        <label className="mt-1 center">Enter Loan Amount</label>
                    </div>
                    <div className="col-3">
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                defaultValue={0}
                                onChange={(e) => { setInitialOffset(Number(e.currentTarget.value))}} />
                        </InputGroup>
                        <label className="mt-1 center">Enter Offset Starting Balance</label>
                    </div>
                    <div className="col-2">
                        <InputGroup>
                            <InputGroup.Text>%</InputGroup.Text>
                            <Form.Control
                                type="number"
                                defaultValue={loanParameters.interestRate}
                                onChange={(e) => {setLoanParameters({...loanParameters,interestRate:Number(e.currentTarget.value)})}} />
                        </InputGroup>
                        <label className="mt-1 center">Annual Interest Rate</label>
                    </div>
                    <div className="col-2">
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                defaultValue={additionalPayments}
                                onChange={(e) => {setAdditionalPayments(Number(e.currentTarget.value))}} />
                        </InputGroup>
                        <label className="mt-1 center">Additional Payments</label>
                    </div>
                </div>
            </div>
            <div className="center container">
                <LineChart width={1000} height={500} data={loan?.loanBreakdownSchedule!}>
                    <XAxis dataKey="date" tickFormatter={(date)=>date.toLocaleDateString('en-AU')}/>
                    <YAxis type='number' domain={[0,loanParameters.principle]}/>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="principleBalance" stroke="#8884d8" dot={false} />
                    <Tooltip content={<CustomTooltip />}/>
                </LineChart>
            </div>
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>Payment No</th>
                            <th>Amount</th>
                            <th>Interest Component</th>
                            <th>Principle Component</th>
                            <th>Principle Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                            {loan&&loan!.loanBreakdownSchedule?.length!>0&&loan!.loanBreakdownSchedule!.map(
                                (loanPayment)=>(loanPayment.principleBalance>0&&
                                <>
                                    <tr>
                                        <td>{loanPayment.date.toLocaleDateString('en-AU')}</td>
                                        <td>{displayDollars(loanPayment.principlePayment+loanPayment.interestPayment)}</td>
                                        <td>{displayDollars(loanPayment.interestPayment)}</td>
                                        <td>{displayDollars(loanPayment.principlePayment)}</td>
                                        <td>{displayDollars(loanPayment.principleBalance)}</td>
                                    </tr>
                                </>
                                )
                            )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}