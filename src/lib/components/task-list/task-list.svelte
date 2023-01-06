<script lang="ts">    
    import { page } from '$app/stores';
</script>
    
<p>{$page.data.tasks}</p>

<form method="post">
    <input type="text" id="taskName" placeholder="Task Name"/>
    <input type="text" id="description" placeholder="Description"/>
    <input type="submit"/>
</form>