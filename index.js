const pin_array=[2,4,5,12,13,14,15,16],pin_detail=["My Room","Dinning","kitchen","Bathroom","park","Room 3","Stair","Gate"];let pin_array_state=[0,0,0,0,0,0,0,0];function toggleLED(t){let e=t.ID,a=t.children[1].classList,n=0==pin_array_state[t.state]?1:0;a.add("s"),fetch("/toggle?led="+e+"&&state="+n).then((e=>{if(!e.ok)throw new Error("Network response was not ok");a.remove("s"),a.toggle("a"),pin_array_state[t.state]=n})).catch((t=>{}))}window.onload=()=>{fetch("/states").then((t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()})).then((t=>{let e=t=>document.createElement(t);try{pin_array_state=t.state}catch(t){}pin_array.forEach(((t,a)=>{let n=e("li"),o=e("span"),r=e("div"),s=e("div");o.innerText=pin_detail[a]||"NULL",r.className=1==pin_array_state[a]?"so a":"so",s.className="si",n.ID=t,n.state=a,n.onclick=()=>toggleLED(n),n.append(o),n.append(r),r.append(s),document.querySelector("ol").append(n)}))})).catch((t=>{}))};