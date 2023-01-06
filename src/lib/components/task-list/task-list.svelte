<script lang="ts">    
    import { page } from '$app/stores';
    console.log($page.data)
</script>
    
<ul>
    {#each $page.data.tasks as task,i}
        <li>
            <p>{task.title} {task.description}</p>
        </li>
    {/each}
</ul>

<form method="post" action="?/create">
    <input type="title" id="title" placeholder="Task Name" name="title"/>
    <input type="description" id="description" placeholder="Description" name="description"/>
    <input type="submit"/>
</form>