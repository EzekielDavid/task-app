export function Alert({ type }) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {type === 'empty' && (
        <>
          <p>Task list is empty</p>
        </>
      )}

      {type === 'warning' && (
        <>
          <p>
            Task not found
          </p>
        </>
      )}
    </div>
  )
}