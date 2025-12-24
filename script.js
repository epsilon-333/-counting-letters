function bytesOf(str){
  return new TextEncoder().encode(str).length;
}

function updateCounts(){
  const t = document.getElementById('inputText').value || '';
  const including = t.length;
  const excluding = t.replace(/\s+/g,'').length;
  const b = bytesOf(t);
  document.getElementById('countIncluding').textContent = including.toLocaleString();
  document.getElementById('countExcluding').textContent = excluding.toLocaleString();
  document.getElementById('countBytes').textContent = b.toLocaleString();
}

document.addEventListener('DOMContentLoaded', ()=>{
  const ta = document.getElementById('inputText');
  ta.addEventListener('input', updateCounts);
  ta.addEventListener('paste', ()=>{
    setTimeout(()=>{
      updateCounts();
      const mainTitle = document.getElementById('mainTitle');
      if(mainTitle){
        mainTitle.classList.add('title-strong');
        mainTitle.textContent = '글자수 세기';
      }
    },50);
  });
  document.getElementById('clearBtn').addEventListener('click', ()=>{ta.value=''; updateCounts(); ta.focus();});

  const copyBtn = document.getElementById('copyBtn');
  if(copyBtn){
    copyBtn.addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText(ta.value || '');
        const prev = copyBtn.textContent;
        copyBtn.textContent = '복사됨';
        setTimeout(()=>copyBtn.textContent = prev,1500);
      }catch(e){
        // fallback
        ta.select();
        document.execCommand('copy');
        const prev = copyBtn.textContent;
        copyBtn.textContent = '복사됨';
        setTimeout(()=>copyBtn.textContent = prev,1500);
      }
    });
  }
  updateCounts();
});
