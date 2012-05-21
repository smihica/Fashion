function __assert__(predicate) {
  if (!predicate)
    throw new AssertionFailure();
}
/*
 * vim: sts=2 sw=2 ts=2 et
 */
