const form = document.getElementById('avistamiento-form');
const input = document.getElementById('experiencia');
const list = document.getElementById('comentarios');
const status = document.getElementById('comentario-estado');
const storageKey = 'el-void-avistamientos-v1';
let comments = [];

function showComment(text) {
    const article = document.createElement('article');
    article.className = 'avistamiento';
    const avatar = document.createElement('span');
    avatar.className = 'avistamiento-avatar avistamiento-avatar-invitado';
    avatar.textContent = 'Tú';
    avatar.setAttribute('aria-hidden', 'true');
    const content = document.createElement('div');
    content.className = 'avistamiento-contenido';
    const name = document.createElement('h3');
    name.textContent = 'Tú:';
    const message = document.createElement('p');
    message.textContent = text;
    content.append(name, message);
    article.append(avatar, content);
    list.append(article);
}

try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) {
        comments = saved.filter(text => typeof text === 'string' && text.trim() && text.length <= 1000);
    }
} catch {
    // El formulario también funciona cuando el almacenamiento no está disponible.
}
comments.forEach(showComment);

form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
        input.setCustomValidity('Escribe tu experiencia antes de publicarla.');
        input.reportValidity();
        return;
    }
    comments.push(text);
    showComment(text);
    try {
        localStorage.setItem(storageKey, JSON.stringify(comments));
        status.textContent = 'Comentario publicado y guardado en este navegador.';
    } catch {
        status.textContent = 'Comentario publicado. No se pudo guardar para la próxima visita.';
    }
    form.reset();
    input.focus();
});
input.addEventListener('input', () => input.setCustomValidity(''));
